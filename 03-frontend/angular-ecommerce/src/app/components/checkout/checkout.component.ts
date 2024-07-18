import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{


  checkoutFormGroup!: FormGroup;

    totalPrice: number = 0;
    totalQuantity: number = 0.00;
    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];
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
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    }

}
