package com.project3.revtech.controller;

import com.project3.revtech.exception.ApplicationException;
import com.project3.revtech.pojo.ProductPojo;
import com.project3.revtech.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path ="api")
public class ProductController {

    @Autowired
    ProductService productService;

    // Post endPoint Api
    // http://localhost:7777/api/products
    @PostMapping(value = "products")
    ProductPojo  addProduct(@Valid @RequestBody ProductPojo productPojo) throws ApplicationException{
        return  productService.addProductService(productPojo);
    }

    // Put endPoint Api - Updating by id
    // http://localhost:7777/api/products/2
    @PutMapping("products/{pid}")
    ProductPojo updateProduct(@Valid @RequestBody ProductPojo productPojo) throws ApplicationException {
        return productService.updateProductService(productPojo);
    }

    //  Delete endPoint Api - Delete by id
    // http://localhost:7777/api/products/5
    @DeleteMapping("products/{pid}")
    boolean deleteProduct(@PathVariable("pid") int productId) throws ApplicationException{
        return productService.deleteProductService(productId);
    }

    //  Get endPoint Api - Retrieve One Product by id
    // http://localhost:7777/api/products/8
    @GetMapping("products/{pid}")
    ProductPojo getAProduct(@PathVariable("pid") int productId) throws ApplicationException{
        return productService.getAProductService(productId);
    }

    //  Get endPoint Api - List All Products
    // http://localhost:7777/api/products
    @GetMapping("products")
    List<ProductPojo> getAllProducts() throws ApplicationException{
        return productService.getAllProductService();
    }

    //-------endpoints  only for Get one or ALl  DiscountProduct(s) - JoinPojo related
    //  Get endPoint Api - List All discounted Products
    // http://localhost:7777/api/alldiscountedproducts

    //  Get endPoint Api - List One discounted Product
    // http://localhost:7777/api/onediscountedproducts

}
