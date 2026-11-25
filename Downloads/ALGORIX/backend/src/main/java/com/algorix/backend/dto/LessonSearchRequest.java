package com.algorix.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class LessonSearchRequest {

    @NotBlank
    private String content;

    @NotBlank
    private String query;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
