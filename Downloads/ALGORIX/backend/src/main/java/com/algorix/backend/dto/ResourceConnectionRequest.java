package com.algorix.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class ResourceConnectionRequest {

    @NotNull
    private UUID sourceId;

    @NotNull
    private UUID targetId;

    public UUID getSourceId() {
        return sourceId;
    }

    public void setSourceId(UUID sourceId) {
        this.sourceId = sourceId;
    }

    public UUID getTargetId() {
        return targetId;
    }

    public void setTargetId(UUID targetId) {
        this.targetId = targetId;
    }
}
