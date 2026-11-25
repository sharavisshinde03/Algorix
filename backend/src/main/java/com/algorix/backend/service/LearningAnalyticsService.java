package com.algorix.backend.service;

import com.algorix.backend.algorithm.SegmentTree;
import com.algorix.backend.dto.ActivityRequest;
import com.algorix.backend.dto.LearningAnalyticsResponse;
import com.algorix.backend.entity.LearningActivity;
import com.algorix.backend.entity.User;
import com.algorix.backend.repository.LearningActivityRepository;
import com.algorix.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class LearningAnalyticsService {

    private final LearningActivityRepository activityRepository;
    private final UserRepository userRepository;

    public LearningAnalyticsService(
            LearningActivityRepository activityRepository,
            UserRepository userRepository
    ) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void recordActivity(String email, ActivityRequest request) {

        LocalDate date = request.getActivityDate();

        if (date.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "Activity date cannot be in the future."
            );
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found.")
                );

        LearningActivity activity = activityRepository
                .findByUser_IdAndActivityDate(user.getId(), date)
                .orElseGet(() -> {
                    LearningActivity newActivity = new LearningActivity();
                    newActivity.setUser(user);
                    newActivity.setActivityDate(date);
                    newActivity.setMinutes(0);
                    return newActivity;
                });

        activity.setMinutes(activity.getMinutes() + request.getMinutes());

        activityRepository.save(activity);
    }

    @Transactional(readOnly = true)
    public LearningAnalyticsResponse getAnalytics(
            String email,
            LocalDate startDate,
            LocalDate endDate
    ) {
        if (startDate == null || endDate == null
                || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Invalid date range.");
        }

        long days = ChronoUnit.DAYS.between(startDate, endDate) + 1;

        if (days > 366) {
            throw new IllegalArgumentException(
                    "Date range cannot exceed 366 days."
            );
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found.")
                );

        List<LearningActivity> activities =
                activityRepository
                        .findAllByUser_IdAndActivityDateBetweenOrderByActivityDateAsc(
                                user.getId(),
                                startDate,
                                endDate
                        );

        int size = Math.toIntExact(days);
        long[] dailyMinutes = new long[size];

        Map<LocalDate, Integer> activityMap = new HashMap<>();

        for (LearningActivity activity : activities) {
            int index = Math.toIntExact(
                    ChronoUnit.DAYS.between(
                            startDate,
                            activity.getActivityDate()
                    )
            );

            dailyMinutes[index] = activity.getMinutes();
            activityMap.put(
                    activity.getActivityDate(),
                    activity.getMinutes()
            );
        }

        SegmentTree segmentTree = new SegmentTree(dailyMinutes);
        long totalMinutes = segmentTree.query(0, size - 1);

        List<LearningAnalyticsResponse.DailyActivity> dailyActivity =
                new ArrayList<>();

        for (int i = 0; i < size; i++) {
            LocalDate date = startDate.plusDays(i);

            dailyActivity.add(
                    new LearningAnalyticsResponse.DailyActivity(
                            date,
                            activityMap.getOrDefault(date, 0)
                    )
            );
        }

        return new LearningAnalyticsResponse(
                startDate,
                endDate,
                totalMinutes,
                dailyActivity
        );
    }
}
