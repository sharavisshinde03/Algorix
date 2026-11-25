package com.algorix.backend.controller;

import com.algorix.backend.dto.LeaderboardEntryResponse;
import com.algorix.backend.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<LeaderboardEntryResponse> getLeaderboard(
            @RequestParam(defaultValue = "10") int limit
    ) {
        return leaderboardService.getLeaderboard(limit);
    }
}
