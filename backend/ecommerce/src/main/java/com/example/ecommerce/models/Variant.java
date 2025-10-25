package com.example.ecommerce.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "variants")
@Data
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ElementCollection
    private List<String> images;

    @NotNull
    private Long sellingPrice;

    @NotNull
    private Long mrpPrice;

    @NotNull
    private String discount;

    private Long stock;
    private Double weight;
    private String color;
    private String size;

    private boolean isActive = true;


    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
