package com.algorix.backend.service;

import com.algorix.backend.algorithm.KMP;
import com.algorix.backend.dto.LessonSearchResponse;
import org.springframework.stereotype.Service;

@Service
public class LessonSearchService {

    private final KMP kmp = new KMP();

    public LessonSearchResponse search(String content, String query) {

        if (content == null || query == null || query.isBlank()) {
            throw new IllegalArgumentException("Content and query are required.");
        }

        return new LessonSearchResponse(
                query,
                kmp.search(content, query)
        );
    }
}
