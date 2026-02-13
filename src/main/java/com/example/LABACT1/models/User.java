package com.example.LABACT1.models;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // This Lombok annotation generates getters/setters automatically
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // This will store the BCrypt hash, not plain text
}