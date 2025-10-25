package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.category.CategoryNotFoundException;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.repositories.CategoryRepository;
import com.example.ecommerce.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(Category category) {
        if (category.getParentCategory() != null && category.getParentCategory().getId() != null) {
            Category parent = this.getParentCategory(category.getId());

            category.setParentCategory(parent);
        }

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category existingCategory = this.getCategoryById(categoryId);

        if (category.getParentCategory() != null && category.getParentCategory().getId() != null)
            existingCategory.setParentCategory(this.getParentCategory(category.getParentCategory().getId()));

        if (category.getName() != null && !category.getName().trim().isEmpty())
            existingCategory.setName(category.getName().trim());

        if (category.getDescription() != null && !category.getDescription().trim().isEmpty())
            existingCategory.setDescription(category.getDescription().trim());

        if (category.getImage() != null && !category.getImage().trim().isEmpty())
            existingCategory.setImage(category.getImage().trim());


        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = this.getCategoryById(categoryId);

        categoryRepository.delete(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryId));
    }

    @Override
    public Category getCategoryByName(String name) {
        Category category = categoryRepository.findCategoryByName(name);

        if (category == null) {
            throw new CategoryNotFoundException("Category not found with name: " + name);
        }

        return category;
    }

    @Override
    public Category getParentCategory(Long categoryId) {
        Category category = this.getCategoryById(categoryId);
        Category parentCategory = category.getParentCategory();

        if (parentCategory == null) {
            throw new CategoryNotFoundException("No parent category for category id: " + categoryId);
        }

        return parentCategory;
    }

    @Override
    public List<Category> getSubCategories(Long categoryId) {
        Category category = this.getCategoryById(categoryId);
        return category.getSubcategories() != null ? category.getSubcategories() : List.of();
    }
}
