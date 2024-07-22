package com.sh.ecommerce.service;


import com.sh.ecommerce.dto.Purchase;
import com.sh.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
