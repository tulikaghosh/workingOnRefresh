import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ProductAndDiscountService } from './product-and-discount.service';



export interface ProductAndDiscount {
  productId: number;
  productSku: string;
  productName: string;
  productCost: number;

}


describe('ProductAndDiscountService', () => {
  let service: ProductAndDiscountService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductAndDiscountService
      ],
    });
    service = TestBed.inject(ProductAndDiscountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch productAndDiscont as an Observable`, async(inject([HttpTestingController, ProductAndDiscountService],
    (httpClient: HttpTestingController, service: ProductAndDiscountService) => {

      const productAndDiscountItem = [
        {
          "productId": 1,
          "productSku": "A0XB34XBOX00234",
          "productName": "Xbox One",
          "productCost":199.99,
        },
        {
          "productId": 2,
          "productSku": "A0XB34GLAPTOP00234",
          "productName": "Macbook Pro",
          "productCost": 1999.99,
        },
        {
          "productId": 3,
          "productSku": "A0XB34GPHONE00234",
          "productName": "Iphone 13 Pro",
          "productCost": "1099.99"
        }
      ];


      service.getProductAndDiscountService(1).subscribe((pad: any) => {
        expect(pad.length).toBe(3);
      });

      let req = httpMock.expectOne('https://jsonplaceholder.typicode.com/productanddiscount');
      expect(req.request.method).toBe("GET");

      req.flush(productAndDiscountItem);
      httpMock.verify();

    })));

});
