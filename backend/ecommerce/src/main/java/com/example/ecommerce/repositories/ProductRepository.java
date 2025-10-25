package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsFeaturedTrue();

    List<Product> findByIsBestSellerTrue();

    List<Product> findBySellerId(Long sellerId);

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByCategory_Name(String categoryName);

    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
