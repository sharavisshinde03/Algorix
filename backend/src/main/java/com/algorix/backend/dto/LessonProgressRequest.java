package com.algorix.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class LessonProgressRequest {

    private Boolean completed;

    @Min(0)
    @Max(100)
    private Integer quizScore;

    public Boolean getCompleted() { return completed; }
    public Integer getQuizScore() { return quizScore; }

    public void setCompleted(Boolean completed) { this.completed = completed; }
    public void setQuizScore(Integer quizScore) { this.quizScore = quizScore; }
}
