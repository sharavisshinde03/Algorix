package com.algorix.backend.service;

import com.algorix.backend.entity.LeetCodeQuestion;
import com.algorix.backend.repository.LeetCodeQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LeetCodeQuestionService {

    private final LeetCodeQuestionRepository repository;

    public LeetCodeQuestionService(
            LeetCodeQuestionRepository repository
    ) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<LeetCodeQuestion> getQuestionsForChapter(
            String chapterId
    ) {
        if (chapterId == null || chapterId.isBlank()) {
            return List.of();
        }

        return repository.findByChapterIdOrderByProblemNumberAsc(
                chapterId.trim()
        );
    }
}
