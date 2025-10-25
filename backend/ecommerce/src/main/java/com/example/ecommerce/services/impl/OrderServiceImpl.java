package com.example.ecommerce.services.impl;

import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.models.Order;
import com.example.ecommerce.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Override
    public Order createOrder(Long userId) {
        return null;
    }

    @Override
    public Order updateOrder(Long orderId, Order order) {
        return null;
    }

    @Override
    public void cancelOrder(Long orderId) {

    }

    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return List.of();
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return Optional.empty();
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        return null;
    }
}
