package com.sh.ecommerce.dao;

import com.sh.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
/*
*The ProductCategoryRepository extends JpaRepository,
which provides CRUD operations (Create, Read, Update, Delete) and query methods.
*Spring Data JPA automatically implements these methods,
so you don't have to write any boilerplate code.
 */
