package com.algorix.backend.controller;

import com.algorix.backend.dto.ActivityRequest;
import com.algorix.backend.dto.LearningAnalyticsResponse;
import com.algorix.backend.service.LearningAnalyticsService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class LearningAnalyticsController {

    private final LearningAnalyticsService analyticsService;

    public LearningAnalyticsController(
            LearningAnalyticsService analyticsService
    ) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/activity")
    public Map<String, String> recordActivity(
            @Valid @RequestBody ActivityRequest request,
            Principal principal
    ) {
        analyticsService.recordActivity(
                principal.getName(),
                request
        );

        return Map.of("message", "Learning activity recorded successfully.");
    }

    @GetMapping("/learning")
    public LearningAnalyticsResponse getAnalytics(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            Principal principal
    ) {
        return analyticsService.getAnalytics(
                principal.getName(),
                startDate,
                endDate
        );
    }
}
