package com.sh.ecommerce.dao;

import com.sh.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin("http://localhost:4200") // allows calls from browser scrips from this origin
//^ also fixes the Cors error
public interface ProductRepository extends JpaRepository<Product /*entityclass*/, Long/*
primary key type*/> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
//    Page<Product>: Returns a paginated list of products.
//    findByCategoryId: Finds products by the category ID.
//    @Param("id") Long id: Maps the method parameter id to the query parameter id.
//    Pageable pageable: Encapsulates pagination information,
//    such as page number, page size, and sorting details.
    // Springboot automatically creates a query in the background
    // `SELECT * FROM product WHERE category_id=`
    //exposes the /api/products/search/findByCategoryId endpoint
    //used with ?id=1 for example findByCategoryId?id=1
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
/*
*The ProductCategoryRepository extends JpaRepository,
which provides CRUD operations (Create, Read, Update, Delete) and query methods.
*Spring Data JPA automatically implements these methods,
so you don't have to write any boilerplate code.
 */
