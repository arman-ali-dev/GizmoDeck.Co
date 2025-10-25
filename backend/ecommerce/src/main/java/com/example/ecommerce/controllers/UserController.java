package com.example.ecommerce.controllers;

import com.example.ecommerce.models.User;
import com.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
class UserController {
    final private UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) {
        User userProfile = userService.getUserProfile(jwt);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }
}
