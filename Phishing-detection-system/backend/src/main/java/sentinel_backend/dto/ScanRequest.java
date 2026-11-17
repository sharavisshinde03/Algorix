package sentinel_backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ScanRequest(

    @NotBlank(message = "URL cannot be empty")
    String url

) {}