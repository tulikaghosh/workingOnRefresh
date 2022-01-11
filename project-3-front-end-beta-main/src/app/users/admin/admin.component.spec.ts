import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormBuilder, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Discount, Product, ProductAndDiscount } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;
  let formTest: NgControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ AdminComponent ],
      providers: [ProductService, FormBuilder, NgControl]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
    formTest = TestBed.inject(NgControl);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loadProducts',() =>{
    let expectedProducts: Product[];
    beforeEach(() => {

      expectedProducts = [
        {productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:500.00,productCategory:"Console",
        productDescription:"Refrigator and an fun console",productQty:3,
        imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
        productRemoved:false}
      ] as Product[];

    });

    //Test case 1
    it('should return expected products by calling once', () => {
      productService.getAllProductsService().subscribe(
        prods => expect(prods).toEqual(expectedProducts,'should  have empty product array'),
        fail
      );

      const require = httpTestingController.match(productService.productsUrlGetAll);
      expect(require[0].request.method).toEqual('GET');
      require[0].flush(expectedProducts);
    });

    //Test case 2
   it('should be OK returning no products', () =>{
    productService.getAllProductsService().subscribe(
      prods => expect(prods.length).toEqual(0,'should have empty product array'),
      fail
    );
    const require = httpTestingController.match(productService.productsUrlGetAll);
    require[0].flush([]);
    });
  })


  describe('#loadDiscountedProducts',() =>{
    let expectedDiscountProducts: ProductAndDiscount[];
    beforeEach(() => {

      expectedDiscountProducts = [
        {productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:500.00,productCategory:"Console",
        productDescription:"Refrigator and an fun console",productQty:3,
        imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
        productRemoved:false, discountId:1, discountDescription: "Discounted product", discountPercentage: 5}
      ] as ProductAndDiscount[];

    });

    //Test case 1
    it('should return expected products by calling once', () => {
      productService.getAllDiscountsProductsService().subscribe(
        prods => expect(prods).toEqual(expectedDiscountProducts,'should  have empty product array'),
        fail
      );

      const require = httpTestingController.match(productService.discountProductUrlGet);
      expect(require[0].request.method).toEqual('GET');
      require[0].flush(expectedDiscountProducts);
    });

    //Test case 2
   it('should be OK returning no products', () =>{
    productService.getAllDiscountsProductsService().subscribe(
      prods => expect(prods.length).toEqual(0,'should have empty product array'),
      fail
    );
    const require = httpTestingController.match(productService.discountProductUrlGet);
    require[0].flush([]);
    }); 
    
    //Test Case 3
    it('should be OK when called mulitple times', () =>{
      productService.getAllDiscountsProductsService().subscribe();
      productService.getAllDiscountsProductsService().subscribe(
        req => expect(req).toEqual(expectedDiscountProducts,'should return expected discount products'),
        fail
      );
      const requests = httpTestingController.match(productService.discountProductUrlGet);
      expect(requests.length).toEqual(3, 'calls to getAllDiscountedProducts()');
      requests[0].flush([]); //Return Empty body for first call
      requests[1].flush(expectedDiscountProducts); //Return expectedEmps in second call
    })

  })

  describe('#addProducts',() =>{
    let addedProduct: Product;
    let expectedProduct: Product[];
    beforeEach(() => {

      expectedProduct = [
        {productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:500.00,productCategory:"Console",
        productDescription:"Refrigator and an fun console",productQty:3,
        imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
        productRemoved:false}
      ] as Product[];

      addedProduct =
      { productId: 2, productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:500.00,productCategory:"Console",
      productDescription:"Refrigator and an fun console",productQty:3,
      imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
      productRemoved:false };

    });

    //Test case 1
    it('should POST expected products by calling once', () => {
      productService.addProductsService(addedProduct).subscribe(
        prods => expect(prods).toContain(addedProduct,'should  add discounted product'),
        fail
      );

      const require = httpTestingController.match(productService.productsUrlAdd);
      expect(require[0].request.method).toEqual('POST');
      expectedProduct.push(addedProduct);
      require[0].flush(expectedProduct);
    });


  });

  describe('#updatedProducts',() =>{
    let updatedProduct: Product;
    let oldProduct: Product;
    beforeEach(() => {

      oldProduct = 
        {productId: 2,productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:500.00,productCategory:"Console",
        productDescription:"Refrigator and an fun console",productQty:3,
        imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
        productRemoved:false};
      

      updatedProduct =
      {productId: 2, productSku:"FEA86ES5DFA",productName:"ZBox IX Scarlet",productCost:400.00,productCategory:"Console",
      productDescription:"Refrigator and an fun console",productQty:3,
      imageUrl:"https://i5.walmartimages.com/asr/be6a800b-bf17-4e6d-8872-d3657d6c7791.3e4037b99ee035280f354118613c8e8b.jpeg",
      productRemoved:false };

    });

    //Test case 1
    it('should update product by calling once', () => {
      productService.updateProductsService(oldProduct).subscribe(
        prods => expect(prods).toEqual(updatedProduct,'should update product'),
        fail
      );

      const require = httpTestingController.match(productService.productsUrlUpdate+"/"+updatedProduct.productId);
      expect(require[0].request.method).toEqual('PUT');
      oldProduct=updatedProduct;
      require[0].flush(updatedProduct);
    });


  });

  describe('#addDiscountedProducts',() =>{
    let addedDiscount: Discount;
    let expectedDiscount: Discount[];
    beforeEach(() => {
      let discId = 2

      expectedDiscount = [
        {productId:1, discountId:discId, discountDescription: "Discounted product", discountPercentage: 5}
      ] as Discount[];

      addedDiscount =
      {productId:2, discountId:3, discountDescription: "Discounted product", discountPercentage: 5};

    });

    //Test case 1
    it('should POST expected discounted products by calling once', () => {
      productService.addDiscountService(addedDiscount).subscribe(
        prods => expect(prods).toContain(addedDiscount,'should  add discounted product'),
        fail
      );

      const require = httpTestingController.match(productService.discountUrlAdd);
      expect(require[0].request.method).toEqual('POST');
      expectedDiscount.push(addedDiscount);
      require[0].flush(expectedDiscount);
    });


  });

  describe('#UpdateDiscounts',() =>{
    let updateDiscount: Discount;
    let oldDiscount: Discount;
    beforeEach(() => {
      let discId = 2

      oldDiscount = 
        {productId:1, discountId:discId, discountDescription: "Discounted product", discountPercentage: 5};

      updateDiscount =
      {productId:1, discountId:discId, discountDescription: "Discounted product", discountPercentage: 8};

    });

    //Test case 1
    it('should update discount by calling once', () => {
      productService.updateDiscountService(oldDiscount).subscribe(
        prods => expect(prods).toEqual(updateDiscount,'should delete discount'),
        fail
      );

      const require = httpTestingController.match(productService.discountUrlUpdate);
      expect(require[0].request.method).toEqual('PUT');
      oldDiscount=updateDiscount;
      require[0].flush(updateDiscount);
    });


  });

  describe('#DeleteDiscounts',() =>{
    let expectedDiscountProducts: Discount[];
    let discId: number =2;
    let index: number = 0;
    beforeEach(() => {

      let discId: number =2;

      expectedDiscountProducts = [
        {productId:1, discountId:1, discountDescription: "Discounted product", discountPercentage: 5},
        {productId:2, discountId:discId, discountDescription: "Discounted product", discountPercentage: 5}
      ] as Discount[];

    });

    //Test case 1
    it('should delete Discounts by calling once', () => {
      productService.deleteDiscountService(discId).subscribe(
        prods => expect(prods).toBeTruthy(discId),
        fail
      );

      const require = httpTestingController.match(productService.discountUrlRemove+"/"+discId);
      expect(require[0].request.method).toEqual('DELETE');
      
      while (expectedDiscountProducts[index].discountId != discId && index < expectedDiscountProducts.length) {
        index++;
      }
      expectedDiscountProducts.splice(index,1);
      require[0].flush(discId);
    });

  })

});
