package com.example.ecommerce.services;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.Seller;

import java.util.List;

public interface ProductService {
    Product createProduct(Seller seller, Long categoryId, Product product);

    Product updateProduct(Long productId, Product product);

    List<Product> getAllProducts();

    List<Product> getFeaturedProducts();

    List<Product> getBestSellerProducts();

    List<Product> getProductsBySellerId(Long sellerId);

    List<Product> getProductsByCategoryId(Long categoryId);

    List<Product> getProductsByCategoryName(String categoryName);

    List<Product> sortProducts(String sortBy, boolean ascending);

    List<Product> searchProducts(String keyword);

    void deleteProduct(Long productId);

    Product getProductById(Long productId);
}
