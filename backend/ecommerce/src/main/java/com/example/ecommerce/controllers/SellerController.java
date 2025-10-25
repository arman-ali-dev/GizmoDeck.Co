package com.example.ecommerce.controllers;

import com.example.ecommerce.enums.AccountStatus;
import com.example.ecommerce.models.Seller;
import com.example.ecommerce.models.VerificationCode;
import com.example.ecommerce.repositories.VerificationRepository;
import com.example.ecommerce.requests.LoginRequest;
import com.example.ecommerce.services.SellerService;
import com.example.ecommerce.utils.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final VerificationRepository verificationRepository;

    @Autowired
    public SellerController(SellerService sellerService, VerificationRepository verificationRepository) {
        this.sellerService = sellerService;
        this.verificationRepository = verificationRepository;
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<Seller> getSellerHandler(@PathVariable Long sellerId) {
        Seller seller = sellerService.getSellerById(sellerId);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerProfileHandler(@RequestHeader("Authorization") String jwt) {
        Seller sellerProfile = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(sellerProfile, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createSellerHandler(@RequestBody Seller seller) {
        Seller createdSeller = sellerService.createSeller(seller);

        String otp = OtpUtil.generateOtp();
        VerificationCode code = new VerificationCode();

        code.setOtp(otp);
        code.setEmail(createdSeller.getEmail());
        code.setExpiresAt(LocalDateTime.now().plusMinutes(1));

        verificationRepository.save(code);

        return new ResponseEntity<>(Map.of("message", "OTP sent to your email."), HttpStatus.CREATED);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifySellerHandler(@RequestBody LoginRequest request) {
        sellerService.verifySeller(request);
        return new ResponseEntity<>("Verified Seller Successfully!", HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAllSellersHandler() {
        List<Seller> sellers = sellerService.getAllSellers();
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    @PatchMapping("/{sellerId}/status/{accountStatus}")
    public ResponseEntity<Seller> updateSellerAccountStatusHandler(@PathVariable Long sellerId, @PathVariable AccountStatus accountStatus) {
        Seller seller = sellerService.updateSellerAccountStatus(sellerId, accountStatus);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/status/{accountStatus}")
    public ResponseEntity<List<Seller>> getSellersByAccountStatus(@PathVariable AccountStatus accountStatus) {
        List<Seller> sellers = sellerService.getSellersByAccountStatus(accountStatus);
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    @PutMapping("/{sellerId}")
    public ResponseEntity<Seller> updateSellerHandler(@PathVariable Long sellerId, @RequestBody Seller seller) {
        Seller updatedSeller = sellerService.updateSeller(sellerId, seller);
        return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
    }

    @DeleteMapping("/{sellerId}")
    public ResponseEntity<String> deleteSellerHandler(@PathVariable Long sellerId) {
        sellerService.deleteSeller(sellerId);
        return new ResponseEntity<>("Seller deleted successfully!", HttpStatus.OK);
    }
}
