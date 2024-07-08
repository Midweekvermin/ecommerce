package com.sh.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity // marks the class as a JPA entity meaning its mapped to a database table
@Table(name="product") // specifies the table its mapped to
@Data //Lombok automatically generates several common methods for you
public class Product {

    @Id // specifies the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // specifies id generation strategy
    /*
    * @GeneratedValue - specifies the primary key generation strategy
    * GenerationType.IDENTITY - says primary key should be automatically incremented
    * in the database
    * */
    @Column(name = "id") // specifies which column in the database the field is mapped
    private Long id;
    @ManyToOne //specifies there is a many to one relationship
    @JoinColumn(name = "category_id", nullable = false)/*
    specifies the column in the database tables that is used to join the entities.
    `name = category_id"`: foreign key column in the product table is named category_id.
    `nullable = false`: Specifies that the category_id cannot be null, this means
    that every product must be associated with a ProductCategory.
    */
    private ProductCategory category; // owns products set in ProductCategory.java for the many to one relationship

    @Column(name = "sku")
    private String sku;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "active")
    private boolean active;
    @Column(name = "units_in_stock")
    private int unitsInStock;
    @Column(name = "date_created")
    @CreationTimestamp //hibernate will automatically manage timestamps
    private Date dateCreated;
    @Column(name = "last_updated")
    @UpdateTimestamp //hibernate will automatically manage timestamps
    private Date lastUpdated;
}
