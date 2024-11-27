package com.example.annotation_backend.dto;

import lombok.Data;

@Data
public class LoginResponse {
    String message;
    String token;

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }
}
