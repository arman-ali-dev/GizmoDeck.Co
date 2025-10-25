package com.example.ecommerce.services;

import com.example.ecommerce.models.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Review createReview(Long userId, Long productId, Review review);

    Review updateReview(Long reviewId, Review review);

    void deleteReview(Long reviewId);

    List<Review> getProductReviews(Long productId);

    Optional<Review> getReviewById(Long reviewId);

    List<Review> getReviewsByUser(Long userId);

    double getAverageRatingForProduct(Long productId);
}
