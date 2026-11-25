package com.algorix.backend.service;

import com.algorix.backend.algorithm.BloomFilter;
import com.algorix.backend.dto.CreateResourceRequest;
import com.algorix.backend.dto.ResourceCheckResponse;
import com.algorix.backend.entity.Resource;
import com.algorix.backend.repository.ResourceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    private final BloomFilter bloomFilter = new BloomFilter(10000, 5);

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @PostConstruct
    public void loadExistingResources() {
        resourceRepository.findAll()
                .forEach(resource -> bloomFilter.add(normalize(resource.getTitle())));
    }

    @Transactional
    public Resource createResource(CreateResourceRequest request) {
        String title = request.getTitle().trim();

        if (resourceRepository.existsByTitleIgnoreCase(title)) {
            throw new IllegalArgumentException("Resource already exists.");
        }

        Resource resource = new Resource();
        resource.setTitle(title);
        resource.setResourceType(request.getResourceType().trim());
        resource.setResourceUrl(request.getResourceUrl());

        Resource saved = resourceRepository.save(resource);

        bloomFilter.add(normalize(saved.getTitle()));

        return saved;
    }


    @Transactional
    public Resource saveDiscoveredResource(
            String title,
            String resourceType,
            String resourceUrl
    ) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Resource title cannot be empty.");
        }

        String cleanTitle = title.trim();
        String normalizedTitle = normalize(cleanTitle);

        boolean possibleMatch = bloomFilter.mightContain(normalizedTitle);

        if (possibleMatch) {
            var existing = resourceRepository.findByTitleIgnoreCase(cleanTitle);
            if (existing.isPresent()) {
                return existing.get();
            }
        }

        if (resourceUrl != null && !resourceUrl.isBlank()) {
            var existingByUrl =
                    resourceRepository.findByResourceUrlIgnoreCase(resourceUrl.trim());

            if (existingByUrl.isPresent()) {
                return existingByUrl.get();
            }
        }

        Resource resource = new Resource();
        resource.setTitle(cleanTitle);
        resource.setResourceType(resourceType);
        resource.setResourceUrl(
                resourceUrl == null ? null : resourceUrl.trim()
        );

        Resource saved = resourceRepository.save(resource);
        bloomFilter.add(normalize(saved.getTitle()));

        return saved;
    }

    @Transactional(readOnly = true)
    public ResourceCheckResponse checkResource(String title) {
        String normalizedTitle = normalize(title);

        boolean possibleMatch = bloomFilter.mightContain(normalizedTitle);

        boolean exists = possibleMatch
                && resourceRepository.existsByTitleIgnoreCase(title.trim());

        return new ResourceCheckResponse(title, possibleMatch, exists);
    }

    @Transactional(readOnly = true)
    public List<Resource> searchResources(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        String cleanQuery = query.trim();

        return resourceRepository
                .findByTitleContainingIgnoreCaseOrResourceTypeContainingIgnoreCase(
                        cleanQuery,
                        cleanQuery
                );
    }

    private String normalize(String title) {
        return title.trim().toLowerCase(Locale.ROOT);
    }
}
