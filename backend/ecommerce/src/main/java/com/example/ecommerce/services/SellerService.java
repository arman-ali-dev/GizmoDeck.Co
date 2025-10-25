package com.example.ecommerce.services;

import com.example.ecommerce.enums.AccountStatus;
import com.example.ecommerce.models.Seller;
import com.example.ecommerce.requests.LoginRequest;

import java.util.List;

public interface SellerService {
    Seller getSellerById(Long sellerId);

    Seller getSellerProfile(String jwt);

    Seller createSeller(Seller seller);

    List<Seller> getAllSellers();

    List<Seller> getSellersByAccountStatus(AccountStatus status);

    Seller updateSeller(Long sellerId, Seller seller);

    void deleteSeller(Long sellerId);

    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status);

    void verifySeller(LoginRequest request);
}
