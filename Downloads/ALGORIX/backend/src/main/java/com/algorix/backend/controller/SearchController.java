package com.algorix.backend.controller;

import com.algorix.backend.dto.SearchSuggestionResponse;
import com.algorix.backend.service.SearchService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/suggestions")
    public List<SearchSuggestionResponse> getSuggestions(
            @RequestParam String q,
            @RequestParam(defaultValue = "8") int limit
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 20));

        return searchService.getSuggestions(q, safeLimit);
    }
}
