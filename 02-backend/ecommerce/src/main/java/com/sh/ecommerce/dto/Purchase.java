package com.sh.ecommerce.dto;

import com.sh.ecommerce.entity.Address;
import com.sh.ecommerce.entity.Customer;
import com.sh.ecommerce.entity.Order;
import com.sh.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;


@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
