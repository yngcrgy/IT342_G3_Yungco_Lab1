package com.example.LABACT1.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.LABACT1.models.User; // Make sure to import the correct User class

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring generates the SQL for this automatically!
    Optional<User> findByUsername(String username);
}
