import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreProductComponent } from './store-product.component';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Product, ProductAndDiscount } from 'src/app/models/product.model';

describe('StoreProductComponent', () => {
  let component: StoreProductComponent;
  let fixture: ComponentFixture<StoreProductComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ StoreProductComponent ],
      providers: [ProductService,FormBuilder]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductComponent);
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
    const require = httpTestingController.expectOne(productService.productsUrlGetAll);
    require.flush([]);
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
    it('should return expected discounted products by calling once', () => {
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

    //Test case 3
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


});
