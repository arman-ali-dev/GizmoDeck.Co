package com.example.ecommerce.services.impl;

import com.example.ecommerce.config.JwtProvider;
import com.example.ecommerce.exceptions.user.UserNotFoundException;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    final private UserRepository userRepository;
    final private JwtProvider jwtProvider;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User getUserProfile(String jwt) {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserNotFoundException("User not found with this email: " + email);
        }

        return user;
    }

    @Override
    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UserNotFoundException("No authenticated user found");
        }

        String username = authentication.getName();
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + username);
        }

        return user;
    }

    @Override
    public User updateProfile(Long userId, User user) {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long userId) {
        User user = this.getUserById(userId);
        userRepository.delete(user);
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
    }
}
