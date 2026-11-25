package com.algorix.backend.controller;

import com.algorix.backend.dto.LessonProgressRequest;
import com.algorix.backend.dto.LessonProgressResponse;
import com.algorix.backend.service.LessonProgressService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class LessonProgressController {

    private final LessonProgressService progressService;

    public LessonProgressController(LessonProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<LessonProgressResponse> getProgress(Principal principal) {
        return progressService.getProgress(principal.getName());
    }

    @PutMapping("/{lessonId}")
    public LessonProgressResponse updateProgress(
        Principal principal,
        @PathVariable String lessonId,
        @Valid @RequestBody LessonProgressRequest request
    ) {
        return progressService.updateProgress(
            principal.getName(), lessonId, request
        );
    }
}
