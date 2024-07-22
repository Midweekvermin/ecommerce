package com.sh.ecommerce.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="order_tracking_number")
    private String orderTrackingNumber;
    @Column(name="total_quantity")
    private int totalQuantity;
    @Column(name="total_price")
    private BigDecimal totalPrice;
    @Column(name="status")
    private String status;
    @CreationTimestamp
    @Column(name="date_created")
    private Date dateCreated;
    @UpdateTimestamp
    @Column(name="last_updated")
    private Date lastUpdated;


}
