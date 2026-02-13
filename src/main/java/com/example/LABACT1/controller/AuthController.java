package com.example.LABACT1.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LABACT1.models.User;
import com.example.LABACT1.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // 1. Check if username exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken!");
        }

        // 2. Encrypt the password (BCrypt)
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 3. Save to MySQL
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
    // 1. Find user by username
    return userRepository.findByUsername(loginRequest.getUsername())
        .map(user -> {
            // 2. Compare passwords (Raw vs Hashed)
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.ok("Login successful! Welcome " + user.getUsername());
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        })
        .orElse(ResponseEntity.status(401).body("User not found"));
}
}
