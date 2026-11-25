package com.algorix.backend.controller;

import com.algorix.backend.entity.LeetCodeQuestion;
import com.algorix.backend.service.LeetCodeQuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leetcode")
public class LeetCodeQuestionController {

    private final LeetCodeQuestionService service;

    public LeetCodeQuestionController(
            LeetCodeQuestionService service
    ) {
        this.service = service;
    }

    @GetMapping("/chapter/{chapterId}")
    public List<LeetCodeQuestion> getQuestionsForChapter(
            @PathVariable String chapterId
    ) {
        return service.getQuestionsForChapter(chapterId);
    }
}
