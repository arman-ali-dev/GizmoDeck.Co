package com.example.ecommerce.services;

import com.example.ecommerce.models.Address;
import com.example.ecommerce.models.User;

import java.util.List;

public interface AddressService {

    Address addAddress(Address address, Long userId);

    Address updateAddress(Long addressId, Address address);

    void deleteAddress(Long addressId);

    List<Address> getUserAddresses(Long userId);

    Address getAddressById(Long addressId);
}