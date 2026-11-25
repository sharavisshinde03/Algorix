package com.algorix.backend.controller;

import com.algorix.backend.dto.CreateResourceRequest;
import com.algorix.backend.dto.ResourceCheckResponse;
import com.algorix.backend.entity.Resource;
import com.algorix.backend.service.ResourceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Resource createResource(
            @Valid @RequestBody CreateResourceRequest request
    ) {
        return resourceService.createResource(request);
    }

    @GetMapping("/check")
    public ResourceCheckResponse checkResource(
            @RequestParam String title
    ) {
        return resourceService.checkResource(title);
    }

    @GetMapping("/search")
    public List<Resource> searchResources(
            @RequestParam String query
    ) {
        return resourceService.searchResources(query);
    }
}
