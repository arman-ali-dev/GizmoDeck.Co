package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.cart.CartAlreadyExistsException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.CartRepository;
import com.example.ecommerce.services.CartService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart createCart(User user) {
        if (cartRepository.existsByUserId(user.getId())) {
            throw new CartAlreadyExistsException("Cart already exists with user id: " + user.getId());
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCartItems(new ArrayList<>());

        return cartRepository.save(cart);
    }


    @Override
    public CartItem addItemToCart(Long productId, Long userId, int quantity) {
        return null;
    }

    @Override
    public void removeItemFromCart(Long itemId) {

    }

    @Override
    public void deleteCart(Long cartId) {

    }

    @Override
    public void clearCart(Long userId) {

    }

    @Override
    public Cart getCart(Long userId) {
        return null;
    }
}
