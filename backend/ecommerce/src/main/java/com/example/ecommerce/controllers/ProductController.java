package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.services.CategoryService;
import com.example.ecommerce.services.ProductService;
import com.example.ecommerce.services.SellerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final SellerService sellerService;

    @Autowired
    public ProductController(ProductService productService,
                             CategoryService categoryService,
                             SellerService sellerService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.sellerService = sellerService;
    }


//    @PostMapping("/{categoryId}")
//    public ResponseEntity<Product> createProductHandler()


    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProductHandler(@PathVariable Long productId,
                                                        @Valid @RequestBody  Product product) {
        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProductsHandler() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/all/featured")
    public ResponseEntity<List<Product>> getAllFeaturedProductsHandler() {
        List<Product> products = productService.getFeaturedProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/all/best-seller")
    public ResponseEntity<List<Product>> getAllBestSellerProductsHandler() {
        List<Product> products = productService.getBestSellerProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/sellers/{sellerId}")
    public ResponseEntity<List<Product>> getSellerProductsHandler(@PathVariable Long sellerId) {
        List<Product> products = productService.getProductsBySellerId(sellerId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<List<Product>> getCategoryProductsHandler(@PathVariable Long categoryId) {
        List<Product> products = productService.getProductsByCategoryId(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<List<Product>> getCategoryProductsByNameHandler(
            @PathVariable String categoryName) {
        List<Product> products = productService.getProductsByCategoryName(categoryName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/sort")
    public ResponseEntity<List<Product>> sortProductsHandler(
            @RequestParam String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending) {
        List<Product> products = productService.sortProducts(sortBy, ascending);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductsHandler(
            @RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProductHandler(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Product deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductHandler(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
