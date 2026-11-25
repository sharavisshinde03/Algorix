package com.algorix.backend.controller;

import com.algorix.backend.dto.ProgressSummaryResponse;
import com.algorix.backend.entity.LessonProgress;
import com.algorix.backend.entity.User;
import com.algorix.backend.repository.LessonProgressRepository;
import com.algorix.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/progress/summary")
public class ProgressSummaryController {

    private static final int TOTAL_CURRICULUM_CHAPTERS = 46;

    private final LessonProgressRepository progressRepository;
    private final UserRepository userRepository;

    public ProgressSummaryController(
            LessonProgressRepository progressRepository,
            UserRepository userRepository
    ) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ProgressSummaryResponse getSummary(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));

        List<LessonProgress> progress =
                progressRepository.findAllByUser_IdOrderByLastAccessedAtDesc(
                        user.getId()
                );

        int started = progress.size();

        int completed = (int) progress.stream()
                .filter(LessonProgress::isCompleted)
                .count();

        double averageScore = progress.stream()
                .map(LessonProgress::getQuizScore)
                .filter(score -> score != null)
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);

        double completionPercentage =
                Math.min(100.0,
                        (completed * 100.0) / TOTAL_CURRICULUM_CHAPTERS);

        return new ProgressSummaryResponse(
                started,
                completed,
                Math.round(averageScore * 10.0) / 10.0,
                Math.round(completionPercentage * 10.0) / 10.0
        );
    }
}
