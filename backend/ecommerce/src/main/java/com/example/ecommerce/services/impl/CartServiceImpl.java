package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.cart.CartAlreadyExistsException;
import com.example.ecommerce.exceptions.cart.CartItemNotFoundException;
import com.example.ecommerce.exceptions.cart.CartNotFoundException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.CartItemRepository;
import com.example.ecommerce.repositories.CartRepository;
import com.example.ecommerce.requests.AddItemToCartRequest;
import com.example.ecommerce.services.CartService;
import com.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository,
                           ProductService productService, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.cartItemRepository = cartItemRepository;
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
    public CartItem addItemToCart(AddItemToCartRequest request, User user) {
        Product product = productService.getProductById(request.getProductId());

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    return this.createCart(user);
                });

        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct(cart, product);

        CartItem cartItem;

        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            cartItem.setTotalPrice(cartItem.getQuantity() * request.getPrice());
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setTotalPrice(request.getPrice() * request.getQuantity());
        }

        CartItem savedItem = cartItemRepository.save(cartItem);

        Long totalCartPrice = cartItemRepository.findByCart(cart).stream()
                .mapToLong(CartItem::getTotalPrice)
                .sum();
        cart.setTotalPrice(totalCartPrice);
        cartRepository.save(cart);

        return savedItem;
    }

    @Override
    public void removeItemFromCart(Long itemId) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new CartItemNotFoundException("Cart item not found with id: " + itemId));

        Cart cart = cartItem.getCart();

        cartItemRepository.delete(cartItem);

        Long totalCartPrice = cartItemRepository.findByCart(cart).stream()
                .mapToLong(CartItem::getTotalPrice)
                .sum();
        cart.setTotalPrice(totalCartPrice);

        cartRepository.save(cart);

    }

    @Override
    public void deleteCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));

        cartItemRepository.deleteAll(cart.getCartItems());

        cartRepository.delete(cart);
    }


    @Override
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));

        cartItemRepository.deleteAll(cart.getCartItems());

        cart.getCartItems().clear();
        cart.setTotalPrice(0L);

        cartRepository.save(cart);
    }

    @Override
    public Cart getCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));
    }
}
