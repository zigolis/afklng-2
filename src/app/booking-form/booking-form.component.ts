import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from './booking.interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})

export class BookingFormComponent implements OnInit {
  booking: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const required = Validators.required;
    const codeMinLength = Validators.minLength(5);
    const codeMaxLength = Validators.maxLength(6);
    const codePattern = Validators.pattern('[A-Za-z0-9]+');

    const nameMinLength = Validators.minLength(2);
    const nameMaxLength = Validators.maxLength(30);
    const namePattern = Validators.pattern('[A-Za-z]+');

    this.booking = this.fb.group({
      code: ['', [required, codeMinLength, codeMaxLength, codePattern]],
      name: ['', [required, nameMinLength, nameMaxLength, namePattern]]
    });
  }

  onSubmit({ value }: { value: Booking }) {
    console.log(value);
  }

  get isCodeEmpty():boolean {
    const code = this.booking.get('code');
    return code.touched && code.hasError('required');
  }

  get isCodeOutsideLimits():boolean {
    const code = this.booking.get('code');
    return code.touched && (code.hasError('minlength') || code.hasError('maxlength'));
  }

  get isCodeInvalid():boolean {
    const code = this.booking.get('code');
    return code.touched && code.hasError('pattern');
  }

  get isNameEmpty():boolean {
    const name = this.booking.get('name');
    return name.touched && name.hasError('required');
  }

  get isNameOutsideLimits():boolean {
    const name = this.booking.get('name');
    return name.touched && (name.hasError('minlength') || name.hasError('maxlength'));
  }

  get isNameInvalid():boolean {
    const name = this.booking.get('name');
    return name.touched && name.hasError('pattern');
  }
}
