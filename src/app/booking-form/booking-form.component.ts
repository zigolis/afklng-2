import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from './booking.interface';
import { BookingService } from './booking.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [BookingService]
})

export class BookingFormComponent implements OnInit {
  booking: FormGroup;
  bookingDetails: Object;
  apiError: Object;

  constructor(private fb: FormBuilder, private service: BookingService) {}

  ngOnInit() {
    const required = Validators.required;
    const lettersAndNumbers = Validators.pattern('^[A-Za-z[2-9]+$');
    const lettersOnly = Validators.pattern('^[A-Za-z]+$');
    const codeMinLength = Validators.minLength(5);
    const codeMaxLength = Validators.maxLength(6);
    const nameMinLength = Validators.minLength(2);
    const nameMaxLength = Validators.maxLength(30);

    this.booking = this.fb.group({
      code: ['', [required, codeMinLength, codeMaxLength, lettersAndNumbers]],
      name: ['', [required, nameMinLength, nameMaxLength, lettersOnly]]
    });
  }

  onSubmit({ value } : { value: Booking }) {
    const {name, code} = value;
    this.service.getBookingDetails(code, name)
        .then(response => this.bookingDetails = response)
        .catch(e => this.apiError = e);
  }

  onGoBack() {
    this.bookingDetails = null;
    this.onReset();
  }

  onReset() {
    this.booking.reset();
  }

  get isCodeEmpty():boolean {
    const code = this.booking.get('code');
    return code.touched && code.hasError('required');
  }

  get isCodeInvalid():boolean {
    const code = this.booking.get('code');
    return code.touched && !this.isCodeEmpty && code.hasError('pattern');
  }

  get isCodeOutOfBounds():boolean {
    const code = this.booking.get('code');
    return code.touched && !this.isCodeEmpty && !this.isCodeInvalid &&
        (code.hasError('minlength') || code.hasError('maxlength'))
  }

  get isNameEmpty():boolean {
    const name = this.booking.get('name');
    return this.booking.touched && name.hasError('required');
  }

  get isNameInvalid():boolean {
    const name = this.booking.get('name');
    return this.booking.touched && !this.isNameEmpty && name.hasError('pattern');
  }

  get isNameOutOfBounds():boolean {
    const name = this.booking.get('name');
    return this.booking.touched && !this.isNameEmpty && !this.isNameInvalid &&
        (name.hasError('minlength') || name.hasError('maxlength'))
  }
}
