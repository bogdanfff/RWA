import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minTodayDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // required validator će ovo već provjeriti

    const selectedDate = new Date(control.value);
    const today = new Date();
    
    // Resetiramo sate na 0 da usporedba bude samo po datumu
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : { minToday: true };
  };
}