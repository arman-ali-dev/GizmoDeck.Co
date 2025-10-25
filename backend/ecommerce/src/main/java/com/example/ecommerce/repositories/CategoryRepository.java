package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryByName(String name);
}
