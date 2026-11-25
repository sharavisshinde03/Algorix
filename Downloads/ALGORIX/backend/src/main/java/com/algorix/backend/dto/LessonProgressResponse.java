package com.algorix.backend.dto;

import com.algorix.backend.entity.LessonProgress;
import java.time.LocalDateTime;

public class LessonProgressResponse {

    private final String lessonId;
    private final boolean completed;
    private final Integer quizScore;
    private final LocalDateTime lastAccessedAt;
    private final LocalDateTime completedAt;

    public LessonProgressResponse(LessonProgress progress) {
        this.lessonId = progress.getLessonId();
        this.completed = progress.isCompleted();
        this.quizScore = progress.getQuizScore();
        this.lastAccessedAt = progress.getLastAccessedAt();
        this.completedAt = progress.getCompletedAt();
    }

    public String getLessonId() { return lessonId; }
    public boolean isCompleted() { return completed; }
    public Integer getQuizScore() { return quizScore; }
    public LocalDateTime getLastAccessedAt() { return lastAccessedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
}
