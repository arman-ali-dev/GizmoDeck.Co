package com.example.ecommerce.services;

import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.User;

public interface CartService {
    Cart createCart(User user);

    CartItem addItemToCart(Long productId, Long userId, int quantity);

    void removeItemFromCart(Long itemId);

    void deleteCart(Long cartId);

    void clearCart(Long userId);

    Cart getCart(Long userId);
}
