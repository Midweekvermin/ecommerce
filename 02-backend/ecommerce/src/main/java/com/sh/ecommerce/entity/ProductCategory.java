package com.sh.ecommerce.entity;


import jakarta.persistence.*;
// import lombok.Data; -- known bug for 'many to' relationships
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity // marks the class as a JPA entity meaning its mapped to a database table
@Table(name="product_category") // specifies the table its mapped to
// known bug -- @Data //Lombok automatically generates several common methods for you
@Getter // Generates getter method for each field
@Setter // generates setter method for each field
public class ProductCategory {
    @Id // specifies the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)// specifies id generation strategy
    /*
     * @GeneratedValue - specifies the primary key generation strategy
     * GenerationType.IDENTITY - says primary key should be automatically incremented
     * in the database
     * */
    @Column(name = "id")// specifies which column in the database the field is mapped
    private Long id;
    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL) // configures one-to-many relationship
    /*
    `mappedBy = "category"`: category field in the Product entity owns the relationship.
    `cascade = CascadeType.ALL`: says all operations should be cascaded to the Product entities,
    meaning all operations will also be automatically applied to the Product entities
     */
    private Set<Product> products; /*
    says that ProductCategories has a collection of Product entities associated with it.
    used in many to many or one to many relationships
    */
}
