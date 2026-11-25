package com.algorix.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class LearningAnalyticsResponse {

    private LocalDate startDate;
    private LocalDate endDate;
    private long totalMinutes;
    private List<DailyActivity> dailyActivity;

    public LearningAnalyticsResponse(
            LocalDate startDate,
            LocalDate endDate,
            long totalMinutes,
            List<DailyActivity> dailyActivity
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalMinutes = totalMinutes;
        this.dailyActivity = dailyActivity;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public long getTotalMinutes() {
        return totalMinutes;
    }

    public List<DailyActivity> getDailyActivity() {
        return dailyActivity;
    }

    public static class DailyActivity {

        private LocalDate date;
        private int minutes;

        public DailyActivity(LocalDate date, int minutes) {
            this.date = date;
            this.minutes = minutes;
        }

        public LocalDate getDate() {
            return date;
        }

        public int getMinutes() {
            return minutes;
        }
    }
}
