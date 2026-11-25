package com.algorix.backend.dto;

public class ResourceCheckResponse {

    private String title;
    private boolean bloomFilterCandidate;
    private boolean existsInDatabase;
    private String message;

    public ResourceCheckResponse(
            String title,
            boolean bloomFilterCandidate,
            boolean existsInDatabase
    ) {
        this.title = title;
        this.bloomFilterCandidate = bloomFilterCandidate;
        this.existsInDatabase = existsInDatabase;
        this.message = existsInDatabase
                ? "Resource found."
                : "Resource not found.";
    }

    public String getTitle() {
        return title;
    }

    public boolean isBloomFilterCandidate() {
        return bloomFilterCandidate;
    }

    public boolean isExistsInDatabase() {
        return existsInDatabase;
    }

    public String getMessage() {
        return message;
    }
}
