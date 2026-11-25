package com.algorix.backend.dto;

import java.util.List;

public class LessonSearchResponse {

    private String query;
    private int totalMatches;
    private List<Integer> positions;

    public LessonSearchResponse(
            String query,
            List<Integer> positions
    ) {
        this.query = query;
        this.positions = positions;
        this.totalMatches = positions.size();
    }

    public String getQuery() {
        return query;
    }

    public int getTotalMatches() {
        return totalMatches;
    }

    public List<Integer> getPositions() {
        return positions;
    }
}
