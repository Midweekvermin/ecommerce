package com.sh.ecommerce.config;

import com.sh.ecommerce.entity.Product;
import com.sh.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration //alerts spring that it's a configuration class
public class MyDataRestConfig implements RepositoryRestConfigurer {
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

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        //does the same as above but for ProductCategory
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
