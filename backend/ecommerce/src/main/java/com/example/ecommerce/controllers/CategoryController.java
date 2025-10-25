package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Category;
import com.example.ecommerce.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<Category> createCategoryHandler(@Valid @RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategoryHandler(@PathVariable Long categoryId,
                                                          @Valid @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(categoryId, category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategoryHandler(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>("Category deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategoriesHandler() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryHandler(@PathVariable Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<Category> getCategoryByNameHandler(@PathVariable String categoryName) {
        Category category = categoryService.getCategoryByName(categoryName);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/parent/{id}")
    public ResponseEntity<Category> getParentCategoryHandler(@PathVariable Long id) {
        Category category = categoryService.getParentCategory(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/{categoryId}/sub")
    public ResponseEntity<List<Category>> getAllCategoriesHandler(@PathVariable Long categoryId) {
        List<Category> categories = categoryService.getSubCategories(categoryId);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
