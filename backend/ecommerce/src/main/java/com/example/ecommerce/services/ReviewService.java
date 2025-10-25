package com.example.ecommerce.services;

import com.example.ecommerce.models.Review;
import com.example.ecommerce.models.User;
import com.example.ecommerce.requests.CreateReviewRequest;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Review createReview(User user, Long productId, CreateReviewRequest request);

    Review updateReview(Long reviewId, CreateReviewRequest request) throws AccessDeniedException;

    void deleteReview(Long reviewId) throws AccessDeniedException;

    List<Review> getProductReviews(Long productId);

    Review getReviewById(Long reviewId);

    List<Review> getReviewsByUser(Long userId);

    double getAverageRatingForProduct(Long productId);
}
