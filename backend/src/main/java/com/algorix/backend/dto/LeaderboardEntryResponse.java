package com.algorix.backend.dto;

import java.util.UUID;

public class LeaderboardEntryResponse {

    private int rank;
    private UUID userId;
    private String name;
    private int completedLessons;
    private double averageQuizScore;
    private int totalScore;

    public LeaderboardEntryResponse(
            int rank,
            UUID userId,
            String name,
            int completedLessons,
            double averageQuizScore,
            int totalScore
    ) {
        this.rank = rank;
        this.userId = userId;
        this.name = name;
        this.completedLessons = completedLessons;
        this.averageQuizScore = averageQuizScore;
        this.totalScore = totalScore;
    }

    public int getRank() { return rank; }
    public UUID getUserId() { return userId; }
    public String getName() { return name; }
    public int getCompletedLessons() { return completedLessons; }
    public double getAverageQuizScore() { return averageQuizScore; }
    public int getTotalScore() { return totalScore; }
}
