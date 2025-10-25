package com.example.ecommerce.services;

import com.example.ecommerce.models.Wishlist;
import com.example.ecommerce.models.WishlistItem;

import java.util.Optional;

public interface WishlistService {
    WishlistItem addItemToWishlist(Long userId, Long productId);

    void removeItemFromWishlist(Long wishlistId);

    Optional<Wishlist> getWishlist(Long userId);

    boolean isProductInWishlist(Long userId, Long productId);
}