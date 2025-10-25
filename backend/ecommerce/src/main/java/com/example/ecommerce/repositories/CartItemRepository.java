package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
    Optional<CartItem> findByCart(Cart cart);
}
