package com.sh.ecommerce.dao;

import com.sh.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // allows calls from browser scrips from this origin
//^ also fixes the Cors error
public interface ProductRepository extends JpaRepository<Product, Long> {
}
/*
*The ProductCategoryRepository extends JpaRepository,
which provides CRUD operations (Create, Read, Update, Delete) and query methods.
*Spring Data JPA automatically implements these methods,
so you don't have to write any boilerplate code.
 */
