package com.example.ecommerce.repositories;

import com.example.ecommerce.enums.AccountStatus;
import com.example.ecommerce.models.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);
}
