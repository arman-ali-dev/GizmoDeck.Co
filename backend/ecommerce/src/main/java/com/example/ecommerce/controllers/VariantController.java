package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Variant;
import com.example.ecommerce.services.VariantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/variants")
public class VariantController {
    private final VariantService variantService;

    @Autowired
    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<Variant> createVariantHandler(@PathVariable Long productId,
                                                        @Valid @RequestBody Variant variant) {
        variantService.createVariant(productId, variant);
        return new ResponseEntity<>(variant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{variantId}")
    public ResponseEntity<String> deleteVariantHandler(@PathVariable Long variantId) {
        variantService.deleteVariant(variantId);
        return new ResponseEntity<>("Variant deleted successfully!", HttpStatus.OK);
    }

    @PutMapping("/{variantId}")
    public ResponseEntity<Variant> updateVariantHandler(@PathVariable Long variantId,
                                                        @Valid @RequestBody Variant variant) {
        Variant updatedVariant = variantService.updateVariant(variantId, variant);
        return new ResponseEntity<>(updatedVariant, HttpStatus.OK);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<List<Variant>> getProductVariantsHandler(@PathVariable Long productId) {
        List<Variant> variants = variantService.getProductVariants(productId);
        return new ResponseEntity<>(variants, HttpStatus.OK);
    }

    @GetMapping("/{variantId}")
    public ResponseEntity<Variant> getVariantHandler(@PathVariable Long variantId) {
        Variant variant = variantService.getVariant(variantId);
        return new ResponseEntity<>(variant, HttpStatus.OK);
    }
}
