package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    boolean existsByUserId(Long userId);
}
