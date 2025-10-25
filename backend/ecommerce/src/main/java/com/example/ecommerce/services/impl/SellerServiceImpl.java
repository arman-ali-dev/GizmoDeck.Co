package com.example.ecommerce.services.impl;

import com.example.ecommerce.config.JwtProvider;
import com.example.ecommerce.enums.AccountStatus;
import com.example.ecommerce.exceptions.authentication.WrongOtpException;
import com.example.ecommerce.exceptions.seller.SellerAlreadyExistsException;
import com.example.ecommerce.exceptions.seller.SellerNotFoundException;
import com.example.ecommerce.models.Address;
import com.example.ecommerce.models.Seller;
import com.example.ecommerce.models.VerificationCode;
import com.example.ecommerce.repositories.AddressRepository;
import com.example.ecommerce.repositories.SellerRepository;
import com.example.ecommerce.repositories.VerificationRepository;
import com.example.ecommerce.requests.LoginRequest;
import com.example.ecommerce.requests.OtpRequest;
import com.example.ecommerce.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final AddressRepository addressRepository;
    private final VerificationRepository verificationRepository;


    @Autowired
    public SellerServiceImpl(SellerRepository sellerRepository, JwtProvider jwtProvider, AddressRepository addressRepository, VerificationRepository verificationRepository) {
        this.sellerRepository = sellerRepository;
        this.jwtProvider = jwtProvider;
        this.addressRepository = addressRepository;
        this.verificationRepository = verificationRepository;
    }

    @Override
    public Seller getSellerById(Long sellerId) {
        return sellerRepository.findById(sellerId).orElseThrow(() -> new SellerNotFoundException("Seller not found with id: " + sellerId));
    }

    @Override
    public Seller getSellerProfile(String jwt) {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller = sellerRepository.findByEmail(email);

        if (seller == null) {
            throw new SellerNotFoundException("Seller not found with email: " + email);
        }

        return seller;
    }

    @Override
    public Seller createSeller(Seller seller) {
        Seller existingSeller = sellerRepository.findByEmail(seller.getEmail());

        if (existingSeller != null) {
            throw new SellerAlreadyExistsException("Seller already exists with email: " + seller.getEmail());
        }


        Address pickupAddress = null;
        if (seller.getPickupAddress() != null) {
            pickupAddress = addressRepository.save(seller.getPickupAddress());
        }

        Seller newSeller = getSeller(seller, pickupAddress);

        return sellerRepository.save(newSeller);
    }

    private static Seller getSeller(Seller seller, Address pickupAddress) {
        Seller newSeller = new Seller();

        newSeller.setName(seller.getName());
        newSeller.setEmail(seller.getEmail());
        newSeller.setPickupAddress(pickupAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setPhoneNumber(seller.getPhoneNumber());
        if (seller.getBusinessDetails() != null) {
            newSeller.setBusinessDetails(seller.getBusinessDetails());
        }
        if (seller.getBankDetails() != null) {
            newSeller.setBankDetails(seller.getBankDetails());
        }
        return newSeller;
    }

    @Override
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    @Override
    public List<Seller> getSellersByAccountStatus(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long sellerId, Seller seller) {
        Seller existingSeller = getSellerById(sellerId);

        if (seller.getName() != null && !seller.getName().trim().isEmpty()) {
            existingSeller.setName(seller.getName());
        }

        if (seller.getPhoneNumber() != null && !seller.getPhoneNumber().trim().isEmpty()) {
            existingSeller.setPhoneNumber(seller.getPhoneNumber());
        }

        if (seller.getEmail() != null && !seller.getEmail().trim().isEmpty()) {
            existingSeller.setEmail(seller.getEmail());
        }

        if (seller.getBusinessDetails() != null) {
            if (existingSeller.getBusinessDetails() == null) {
                existingSeller.setBusinessDetails(seller.getBusinessDetails());
            } else {
                if (seller.getBusinessDetails().getBusinessName() != null)
                    existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
                if (seller.getBusinessDetails().getBusinessEmail() != null)
                    existingSeller.getBusinessDetails().setBusinessEmail(seller.getBusinessDetails().getBusinessEmail());
                if (seller.getBusinessDetails().getBusinessAddress() != null)
                    existingSeller.getBusinessDetails().setBusinessAddress(seller.getBusinessDetails().getBusinessAddress());
            }
        }

        if (seller.getBankDetails() != null) {
            if (existingSeller.getBankDetails() == null) {
                existingSeller.setBankDetails(seller.getBankDetails());
            } else {
                if (seller.getBankDetails().getAccountNumber() != null)
                    existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
                if (seller.getBankDetails().getAccountHolderName() != null)
                    existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
                if (seller.getBankDetails().getIfscCode() != null)
                    existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
            }
        }

        if (seller.getPickupAddress() != null) existingSeller.setPickupAddress(seller.getPickupAddress());

        if (seller.getGSTIN() != null && !seller.getGSTIN().trim().isEmpty())
            existingSeller.setGSTIN(seller.getGSTIN());

        existingSeller.setVerified(seller.isVerified());
        existingSeller.setActive(seller.isActive());

        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long sellerId) {
        Seller seller = this.getSellerById(sellerId);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) {
        Seller seller = this.getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }

    @Override
    public void verifySeller(LoginRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        VerificationCode code = verificationRepository.findByEmail(email);

        if (code == null || !code.getOtp().equals(otp)) {
            throw new WrongOtpException("Wrong Otp!");
        }


        Seller seller = sellerRepository.findByEmail(email);

        if (seller == null) {
            throw new SellerNotFoundException("Seller not found with this email: " + email);
        }

        seller.setVerified(true);
        seller.setActive(true);

        sellerRepository.save(seller);
        verificationRepository.delete(code);
    }
}
