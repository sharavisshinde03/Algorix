package com.algorix.backend.dto;

import java.util.UUID;

public record AuthResponse(
    String token,
    String tokenType,
    UUID id,
    String name,
    String email
) {}
