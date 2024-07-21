import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{




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
        firstName:[''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
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

  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(this.checkoutFormGroup.get('customer')!.value.email);
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
