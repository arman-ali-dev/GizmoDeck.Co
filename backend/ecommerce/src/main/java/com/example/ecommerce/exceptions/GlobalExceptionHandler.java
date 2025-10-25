package com.example.ecommerce.exceptions;

import com.example.ecommerce.exceptions.address.AddressNotFoundException;
import com.example.ecommerce.exceptions.address.InvalidAddressException;
import com.example.ecommerce.exceptions.authentication.WrongOtpException;
import com.example.ecommerce.exceptions.cart.CartAlreadyExistsException;
import com.example.ecommerce.exceptions.category.CategoryNotFoundException;
import com.example.ecommerce.exceptions.product.ProductNotFoundException;
import com.example.ecommerce.exceptions.seller.SellerAlreadyExistsException;
import com.example.ecommerce.exceptions.seller.SellerNotFoundException;
import com.example.ecommerce.exceptions.user.UserAlreadyExistsException;
import com.example.ecommerce.exceptions.user.UserNotFoundException;
import com.example.ecommerce.exceptions.variant.VariantNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Private helper method to build response
    private ResponseEntity<Map<String, Object>> buildErrorResponse(String error, HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAddressNotFound(AddressNotFoundException ex) {
        return buildErrorResponse("Address Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidAddressException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidAddress(InvalidAddressException ex) {
        return buildErrorResponse("Invalid Address", HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFound(UserNotFoundException ex) {
        return buildErrorResponse("User Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildErrorResponse("User Already Exists!", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(CartAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleCartAlreadyExists(CartAlreadyExistsException ex) {
        return buildErrorResponse("Cart Already Exists", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(SellerNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleSellerNotFound(SellerNotFoundException ex) {
        return buildErrorResponse("Seller Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(SellerAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleSellerAlreadyExists(SellerAlreadyExistsException ex) {
        return buildErrorResponse("Seller Already Exists!", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCategoryNotFound(CategoryNotFoundException ex) {
        return buildErrorResponse("Category Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleProductNotFound(ProductNotFoundException ex) {
        return buildErrorResponse("Product Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(VariantNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleVariantNotFound(VariantNotFoundException ex) {
        return buildErrorResponse("Variant Not Found", HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(WrongOtpException.class)
    public ResponseEntity<Map<String, Object>> handleWrongOtp(WrongOtpException ex) {
        return buildErrorResponse("Wrong Otp", HttpStatus.NOT_FOUND, ex.getMessage());
    }


}
