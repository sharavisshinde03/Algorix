package com.algorix.backend.controller;

import com.algorix.backend.dto.ResourceConnectionRequest;
import com.algorix.backend.dto.ResourceGroupResponse;
import com.algorix.backend.service.ResourceConnectionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/resources")
public class ResourceConnectionController {

    private final ResourceConnectionService connectionService;

    public ResourceConnectionController(
            ResourceConnectionService connectionService
    ) {
        this.connectionService = connectionService;
    }

    @PostMapping("/connect")
    public Map<String, String> connectResources(
            @Valid @RequestBody ResourceConnectionRequest request
    ) {
        connectionService.connectResources(
                request.getSourceId(),
                request.getTargetId()
        );

        return Map.of("message", "Resources connected successfully.");
    }

    @GetMapping("/{resourceId}/group")
    public ResourceGroupResponse getResourceGroup(
            @PathVariable UUID resourceId
    ) {
        return connectionService.getResourceGroup(resourceId);
    }
}
