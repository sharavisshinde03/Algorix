package com.algorix.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateResourceRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String resourceType;

    private String resourceUrl;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }
}
