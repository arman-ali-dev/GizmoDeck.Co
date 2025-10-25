package com.example.ecommerce.services;

import com.example.ecommerce.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User getUserProfile(String jwt);

    User updateProfile(Long userId, User user);

    List<User> getAllUsers();

    void deleteUser(Long userId);

    User getUserById(Long userId);
}
