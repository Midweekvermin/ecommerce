import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Shopvalidators } from '../../validators/shopvalidators';

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
    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];
    countries:Country[] =[];
    
    
  constructor(private formBuilder:FormBuilder,
    private ShopFormService:ShopFormService,
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
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
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
  

  onSubmit(){
   if(this.checkoutFormGroup.invalid){
    this.checkoutFormGroup.markAllAsTouched();
   }
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
