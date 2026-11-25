package com.algorix.backend.service;

import com.algorix.backend.dto.*;
import com.algorix.backend.entity.User;
import com.algorix.backend.repository.UserRepository;
import com.algorix.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwtService) {
        this.users = users;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();

        if (users.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(encoder.encode(request.password()));
        users.save(user);

        return response(user);
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();

        User user = users.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!encoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return response(user);
    }

    public AuthResponse currentUser(String email) {
        User user = users.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return response(user);
    }

    private AuthResponse response(User user) {
        return new AuthResponse(
            jwtService.generateToken(user.getEmail()),
            "Bearer",
            user.getId(),
            user.getName(),
            user.getEmail()
        );
    }
}
