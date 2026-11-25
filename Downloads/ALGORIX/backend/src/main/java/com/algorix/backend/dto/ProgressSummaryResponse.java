package com.algorix.backend.dto;

public record ProgressSummaryResponse(
        int totalLessonsStarted,
        int completedLessons,
        double averageQuizScore,
        double completionPercentage
) {}
