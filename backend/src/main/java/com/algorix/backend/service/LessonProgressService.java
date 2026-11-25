package com.algorix.backend.service;

import com.algorix.backend.dto.LessonProgressRequest;
import com.algorix.backend.dto.LessonProgressResponse;
import com.algorix.backend.entity.LessonProgress;
import com.algorix.backend.entity.User;
import com.algorix.backend.repository.LessonProgressRepository;
import com.algorix.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LessonProgressService {

    private final LessonProgressRepository progressRepository;
    private final UserRepository userRepository;

    public LessonProgressService(
        LessonProgressRepository progressRepository,
        UserRepository userRepository
    ) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<LessonProgressResponse> getProgress(String email) {
        User user = findUser(email);

        return progressRepository
            .findAllByUser_IdOrderByLastAccessedAtDesc(user.getId())
            .stream()
            .map(LessonProgressResponse::new)
            .toList();
    }

    @Transactional
    public LessonProgressResponse updateProgress(
        String email,
        String lessonId,
        LessonProgressRequest request
    ) {
        if (lessonId == null || lessonId.isBlank() || lessonId.length() > 150) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid lesson ID"
            );
        }

        User user = findUser(email);

        LessonProgress progress = progressRepository
            .findByUser_IdAndLessonId(user.getId(), lessonId)
            .orElseGet(() -> {
                LessonProgress created = new LessonProgress();
                created.setUser(user);
                created.setLessonId(lessonId);
                return created;
            });

        if (request.getCompleted() != null) {
            progress.setCompleted(request.getCompleted());
            progress.setCompletedAt(
                request.getCompleted() ? LocalDateTime.now() : null
            );
        }

        if (request.getQuizScore() != null) {
            progress.setQuizScore(request.getQuizScore());
        }

        progress.setLastAccessedAt(LocalDateTime.now());

        return new LessonProgressResponse(progressRepository.save(progress));
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            ));
    }
}
