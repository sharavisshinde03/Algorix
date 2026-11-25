package com.algorix.backend.service;

import com.algorix.backend.algorithm.QuickSelect;
import com.algorix.backend.dto.LeaderboardEntryResponse;
import com.algorix.backend.entity.LessonProgress;
import com.algorix.backend.entity.User;
import com.algorix.backend.repository.LessonProgressRepository;
import com.algorix.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;
    private final LessonProgressRepository progressRepository;
    private final QuickSelect quickSelect = new QuickSelect();

    public LeaderboardService(
            UserRepository userRepository,
            LessonProgressRepository progressRepository
    ) {
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
    }

    private static class StudentScore {
        UUID userId;
        String name;
        int completedLessons;
        double averageQuizScore;
        int totalScore;

        StudentScore(User user, List<LessonProgress> progress) {
            this.userId = user.getId();
            this.name = user.getName();

            this.completedLessons = (int) progress.stream()
                    .filter(LessonProgress::isCompleted)
                    .count();

            List<Integer> quizScores = progress.stream()
                    .map(LessonProgress::getQuizScore)
                    .filter(Objects::nonNull)
                    .toList();

            this.averageQuizScore = quizScores.isEmpty()
                    ? 0
                    : quizScores.stream()
                        .mapToInt(Integer::intValue)
                        .average()
                        .orElse(0);

            this.totalScore = completedLessons * 100
                    + (int) Math.round(averageQuizScore);
        }
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntryResponse> getLeaderboard(int limit) {

        if (limit < 1 || limit > 100) {
            throw new IllegalArgumentException(
                    "Leaderboard limit must be between 1 and 100."
            );
        }

        List<User> users = userRepository.findAll();
        List<LessonProgress> allProgress = progressRepository.findAll();

        Map<UUID, List<LessonProgress>> progressByUser =
                allProgress.stream().collect(
                        Collectors.groupingBy(
                                progress -> progress.getUser().getId()
                        )
                );

        List<StudentScore> students = users.stream()
                .filter(user -> progressByUser.containsKey(user.getId()))
                .map(user -> new StudentScore(
                        user,
                        progressByUser.get(user.getId())
                ))
                .toList();

        if (students.isEmpty()) {
            return List.of();
        }

        int k = Math.min(limit, students.size());

        int[] scores = students.stream()
                .mapToInt(student -> student.totalScore)
                .toArray();

        int threshold = quickSelect.findKthLargest(scores, k);

        List<StudentScore> selected = students.stream()
                .filter(student -> student.totalScore >= threshold)
                .sorted(
                        Comparator.comparingInt(
                                (StudentScore student) -> student.totalScore
                        ).reversed()
                        .thenComparing(
                                student -> student.name,
                                String.CASE_INSENSITIVE_ORDER
                        )
                        .thenComparing(student -> student.userId)
                )
                .limit(k)
                .toList();

        List<LeaderboardEntryResponse> result = new ArrayList<>();

        for (int i = 0; i < selected.size(); i++) {
            StudentScore student = selected.get(i);

            result.add(new LeaderboardEntryResponse(
                    i + 1,
                    student.userId,
                    student.name,
                    student.completedLessons,
                    student.averageQuizScore,
                    student.totalScore
            ));
        }

        return result;
    }
}
