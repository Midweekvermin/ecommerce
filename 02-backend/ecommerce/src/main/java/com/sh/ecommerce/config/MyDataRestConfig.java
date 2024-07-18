package com.sh.ecommerce.config;

import com.sh.ecommerce.entity.Country;
import com.sh.ecommerce.entity.Product;
import com.sh.ecommerce.entity.ProductCategory;
import com.sh.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration //alerts spring that it's a configuration class
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
//    The EntityManager is part of the Java
//    Persistence API (JPA) and is used to interact with the persistence context
//    It provides methods to create, read, update, and delete entities.
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
        // Allows class to use the EntityManager without having to manually instantiate it
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};
        //array of methods that we want to be not supported

        /*below disables the put post and delete methods for product
        * config.getExposureConfiguration() : allows you to configure the exposure for the entities
        end points.
                .forDomainType(Product.class) : entities are also known as domain types,
                    this specifies product
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) :
                    withitemexposure configures the settings for individual items, creates a function
                    that takes the args metdata,httpMethods and uses the httpmethods.disable to disable
                    the array of methods.
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }               this does the same as above but for a collection of items
    *               */


        disableHTTPmethods(Country.class,config, theUnsupportedActions);
        disableHTTPmethods(State.class,config, theUnsupportedActions);
        disableHTTPmethods(Product.class,config, theUnsupportedActions);
        disableHTTPmethods(ProductCategory.class,config, theUnsupportedActions);

        exposeIds(config);

    }

    private static void disableHTTPmethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // Get all entities from the EntityManager's metamodel
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        // Create a list to hold the entity classes
        List<Class> entityClasses = new ArrayList<>();
        // Iterate over the set of entities and add their Java types to the list
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        // Convert the list of entity classes to an array
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        // Configure the RepositoryRestConfiguration to expose the IDs for the entity classes
        config.exposeIdsFor(domainTypes);
    }
}
