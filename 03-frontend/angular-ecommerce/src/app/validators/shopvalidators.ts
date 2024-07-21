import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CheckoutComponent } from "../components/checkout/checkout.component";

export class Shopvalidators {

   
 static notOnlywhitespace(control: FormControl) : ValidationErrors | null {

    if((control.value != null) && (control.value.trim().length ===0)) {
        return {'notOnlyWhitespace': true}
    } else {
        return null;
    }

    

 }
   
}
