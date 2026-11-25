package com.algorix.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "lesson_progress",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"user_id", "lesson_id"}
    )
)
public class LessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "lesson_id", nullable = false)
    private String lessonId;

    @Column(nullable = false)
    private boolean completed = false;

    private Integer quizScore;

    private LocalDateTime lastAccessedAt;

    private LocalDateTime completedAt;

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getLessonId() {
        return lessonId;
    }

    public boolean isCompleted() {
        return completed;
    }

    public Integer getQuizScore() {
        return quizScore;
    }

    public LocalDateTime getLastAccessedAt() {
        return lastAccessedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setQuizScore(Integer quizScore) {
        this.quizScore = quizScore;
    }

    public void setLastAccessedAt(LocalDateTime value) {
        this.lastAccessedAt = value;
    }

    public void setCompletedAt(LocalDateTime value) {
        this.completedAt = value;
    }
}