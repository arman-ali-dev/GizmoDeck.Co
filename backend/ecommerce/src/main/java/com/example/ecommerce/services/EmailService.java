package com.example.ecommerce.services;

public interface EmailService {
    void sendVerificationOtpEmail(String userEmail, String subject, String text);
}
