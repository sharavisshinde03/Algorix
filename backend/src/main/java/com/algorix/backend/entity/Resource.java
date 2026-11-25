package com.algorix.backend.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(
    name = "resources",
    indexes = @Index(name = "idx_resource_title", columnList = "title")
)
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 300)
    private String title;

    @Column(nullable = false, length = 100)
    private String resourceType;

    @Column(length = 1000)
    private String resourceUrl;

    public UUID getId() {
        return id;
    }

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
