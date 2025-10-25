package com.example.ecommerce.services;

import com.example.ecommerce.models.CouponCode;

import java.util.Optional;

public interface CouponCodeService {
    CouponCode createCouponCode(CouponCode couponCode);

    CouponCode updateCouponCode(Long couponCodeId, CouponCode couponCode);

    void deleteCouponCode(Long couponCodeId);

    Optional<CouponCode> getCouponCodeById(Long couponCodeId);

    Optional<CouponCode> getCouponCodeByCode(String code);
}
