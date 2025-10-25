package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    boolean existsByUserId(Long userId);

    Optional<Cart> findByUser(User user);

    Optional<Cart> findByUserId(Long userId);
}
