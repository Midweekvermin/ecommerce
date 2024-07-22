import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Shopvalidators } from '../../validators/shopvalidators';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{



  static checkoutFormGroup: any;
  checkoutFormGroup!: FormGroup;
  shippingAddressStates: State [] = [];
  billingAddressStates: State [] = [];

    totalPrice: number = 0;
    totalQuantity: number = 0.00;
    cartItems: CartItem[] = [];
    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];
    countries:Country[] =[];
    
    
  constructor(private formBuilder:FormBuilder,
    private ShopFormService:ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    
  ){}

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        email: ['', [Validators.required, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Shopvalidators.notOnlywhitespace]]
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        state:['', [Validators.required]],
        country:['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]]
      }),
      billingAddress: this.formBuilder.group({
        street:['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        city:['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        state:['', [Validators.required]],
        country:['', [Validators.required]],
        zipCode:['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
      }),
      creditCard: this.formBuilder.group({
        cardType:['', [Validators.required]],
        nameOnCard:['', [Validators.required, Validators.minLength(2), Shopvalidators.notOnlywhitespace]],
        cardNumber:['', [Validators.required,Validators.pattern('[0-9]{16}')]],
        securityCode:['', [Validators.required,Validators.pattern('[0-9]{3}')]],
        expirationMonth:[''],
        expirationYear:[''],
      }),
      
    });
    

    const startMonth: number = new Date().getMonth() +1;

    this.ShopFormService.getCreditCardMonths(startMonth).subscribe(data =>
    {
      this.creditCardMonths = data;
    }
    )
    this.ShopFormService.getCreditCardYears().subscribe(data => {
      this.creditCardYears = data;
    })
    
    this.ShopFormService.getCountries().subscribe(data =>
    {
      this.countries = data;
    }
    )
    this.listCartDetails();

  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeCartTotals();
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}
  get sstreet() {return this.checkoutFormGroup.get('shippingAddress.street');}
  get scity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get sstate() {return this.checkoutFormGroup.get('shippingAddress.state');}
  get scountry() {return this.checkoutFormGroup.get('shippingAddress.country');}
  get szipcode() {return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get bstreet() {return this.checkoutFormGroup.get('billingAddress.street');}
  get bcity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get bstate() {return this.checkoutFormGroup.get('billingAddress.state');}
  get bcountry() {return this.checkoutFormGroup.get('billingAddress.country');}
  get bzipcode() {return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get cardt() {return this.checkoutFormGroup.get('creditCard.cardType');}
  get cardn() {return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get cardsc() {return this.checkoutFormGroup.get('creditCard.securityCode');}
  

  onSubmit(){
   if(this.checkoutFormGroup.invalid){
    this.checkoutFormGroup.markAllAsTouched();
    return;
   }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
   let purchase = new Purchase();

   purchase.customer = this.checkoutFormGroup.controls['customer'].value;




   purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
   const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
   const shippingcountry: State = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
   purchase.shippingAddress.state = shippingState.name;
   purchase.shippingAddress.country = shippingcountry.name;

   purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
   const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
   const sbillingcountry: State = JSON.parse(JSON.stringify(purchase.billingAddress.country));
   purchase.billingAddress.state = shippingState.name;
   purchase.billingAddress.country = shippingcountry.name;

   purchase.order = order;
   purchase.orderItems = orderItems;

   this.checkoutService.placeOrder(purchase).subscribe(
    {
      next: response => {
        alert(`Your order has been received. \n Order tracking number: 
          ${response.orderTrackingNumber}`);
          this.resetCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
   );

  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates=this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    }

    handleMonthsAndYears() {
     const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
     const currentYear: number = new Date().getFullYear();
     const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
     let startMonth: number;
     if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
     }
     else {
      startMonth = 1;
     }

     this.ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
     )
      }

      getStates(formGroupName: string) {
        const formGroup = this.checkoutFormGroup.get(formGroupName);
        const countryCode = formGroup?.value.country.code;
        const countryName = formGroup?.value.country.name;
        this.ShopFormService.getStates(countryCode).subscribe(data =>
        {
          if(formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data;
          }
          else {
            this.billingAddressStates = data;
          }
          formGroup?.get('state')?.setValue(data[0]);
        }
        )
        }

}
