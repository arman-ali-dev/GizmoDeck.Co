package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.product.ProductNotFoundException;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.Seller;
import com.example.ecommerce.models.Variant;
import com.example.ecommerce.repositories.ProductRepository;
import com.example.ecommerce.services.CategoryService;
import com.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final CategoryService categoryService;
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(CategoryService categoryService, ProductRepository productRepository) {
        this.categoryService = categoryService;
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Seller seller, Long categoryId, Product product) {
        Category category = categoryService.getCategoryById(categoryId);

        product.setCategory(category);
        product.setSeller(seller);

        if (product.getVariants() != null) {
            for (Variant variant : product.getVariants()) {
                variant.setProduct(product);
            }
        }

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product existingProduct = this.getProductById(productId);

        if (product.getName() != null && !product.getName().trim().isEmpty())
            existingProduct.setName(product.getName());

        if (product.getDescription() != null && !product.getDescription().trim().isEmpty())
            existingProduct.setDescription(product.getDescription());

        if (product.getCategory() != null) existingProduct.setCategory(product.getCategory());

        if (product.isActive() != existingProduct.isActive()) existingProduct.setActive(product.isActive());

        if (product.isFeatured() != existingProduct.isFeatured()) existingProduct.setFeatured(product.isFeatured());

        if (product.isBestSeller() != existingProduct.isBestSeller())
            existingProduct.setBestSeller(product.isBestSeller());

        return productRepository.save(existingProduct);
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }

    @Override
    public List<Product> getBestSellerProducts() {
        return productRepository.findByIsBestSellerTrue();
    }

    @Override
    public List<Product> getProductsBySellerId(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    @Override
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategory_Name(categoryName);
    }

    @Override
    public List<Product> sortProducts(String sortBy, boolean ascending) {
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return productRepository.findAll(sort);
    }

    @Override
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = this.getProductById(productId);

        productRepository.delete(product);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
    }
}
