package com.example.ecommerce.services;

import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.models.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Order createOrder(Long userId);

    Order updateOrder(Long orderId, Order order);

    void cancelOrder(Long orderId);

    List<Order> getOrdersByUser(Long userId);

    Optional<Order> getOrderById(Long orderId);

    Order updateOrderStatus(Long orderId, OrderStatus orderStatus);
}
