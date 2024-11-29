import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Pipe({
    name: 'errorMessage',
    standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
    transform(control: AbstractControl): string | null {
        if (control && control.errors) {
            return control.errors['errorMessage'] || null;
        }
        return null;
    }
}
