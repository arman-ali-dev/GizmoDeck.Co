package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findByUserId(Long userId);
}
