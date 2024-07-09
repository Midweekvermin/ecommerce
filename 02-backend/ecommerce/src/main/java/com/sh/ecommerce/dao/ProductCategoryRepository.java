package com.sh.ecommerce.dao;

import com.sh.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // allows calls from browser scrips from this origin
//^ also fixes the Cors error
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
//exposes endpoint as /product-category
//collectionResourceRel names Json returned productCategory
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
/*
*The ProductCategoryRepository extends JpaRepository,
which provides CRUD operations (Create, Read, Update, Delete) and query methods.
*Spring Data JPA automatically implements these methods,
so you don't have to write any boilerplate code.
 */
