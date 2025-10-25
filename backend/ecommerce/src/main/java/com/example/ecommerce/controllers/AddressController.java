package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Address;
import com.example.ecommerce.services.AddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {


    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Address> addAddressHandler(
            @PathVariable Long userId, @Valid @RequestBody Address address) {
        Address savedAddress = addressService.addAddress(address, userId);

        return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<Address> updateAddressHandler(
            @PathVariable Long addressId, @Valid @RequestBody Address address) {
        Address updatedAddress = addressService.updateAddress(addressId, address);

        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddressHandler(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);

        return new ResponseEntity<>("Address deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/all/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddressesHandler(@PathVariable Long userId) {
        List<Address> userAddresses = addressService.getUserAddresses(userId);

        return new ResponseEntity<>(userAddresses, HttpStatus.OK);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<Address> getAddressHandler(@PathVariable Long addressId) {
        Address addressById = addressService.getAddressById(addressId);

        return new ResponseEntity<>(addressById, HttpStatus.OK);
    }
}
