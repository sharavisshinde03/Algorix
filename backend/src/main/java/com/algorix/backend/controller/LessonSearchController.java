package com.algorix.backend.controller;

import com.algorix.backend.dto.LessonSearchRequest;
import com.algorix.backend.dto.LessonSearchResponse;
import com.algorix.backend.service.LessonSearchService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
public class LessonSearchController {

    private final LessonSearchService lessonSearchService;

    public LessonSearchController(LessonSearchService lessonSearchService) {
        this.lessonSearchService = lessonSearchService;
    }

    @PostMapping("/search")
    public LessonSearchResponse searchLessonContent(
            @Valid @RequestBody LessonSearchRequest request
    ) {
        return lessonSearchService.search(
                request.getContent(),
                request.getQuery()
        );
    }
}
