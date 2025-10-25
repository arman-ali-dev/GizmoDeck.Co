package com.example.ecommerce.models;

import com.example.ecommerce.enums.AccountStatus;
import com.example.ecommerce.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String phoneNumber;

    @Column(unique = true, nullable = false)
    private String email;

    @Embedded
    private BusinessDetails businessDetails;

    @Embedded
    private BankDetails bankDetails;

    @OneToOne(cascade = CascadeType.ALL)
    private Address pickupAddress;

    private String GSTIN;

    private boolean isVerified = false;
    private boolean isActive= false;

    private AccountStatus accountStatus = AccountStatus.PENDING_VERIFICATION;

    private Role role = Role.SELLER;
}