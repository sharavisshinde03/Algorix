package com.algorix.backend.dto;

import java.util.List;
import java.util.UUID;

public class ResourceGroupResponse {

    private UUID resourceId;
    private int totalResources;
    private List<ResourceItem> resources;

    public ResourceGroupResponse(
            UUID resourceId,
            List<ResourceItem> resources
    ) {
        this.resourceId = resourceId;
        this.resources = resources;
        this.totalResources = resources.size();
    }

    public UUID getResourceId() {
        return resourceId;
    }

    public int getTotalResources() {
        return totalResources;
    }

    public List<ResourceItem> getResources() {
        return resources;
    }

    public static class ResourceItem {

        private UUID id;
        private String title;
        private String resourceType;

        public ResourceItem(UUID id, String title, String resourceType) {
            this.id = id;
            this.title = title;
            this.resourceType = resourceType;
        }

        public UUID getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getResourceType() {
            return resourceType;
        }
    }
}
