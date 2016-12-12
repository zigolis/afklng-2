import { browser, element, by } from 'protractor';

export class KlmPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root app-booking-form section h2')).getText();
  }

  addBookingCode(bookingCode) {
    element(by.name('code')).sendKeys(bookingCode);
  }

  addFamilyName(familyName) {
    element(by.name('name')).sendKeys(familyName);
  }

  clickRetrieveBooking() {
    element(by.css('input.btn-primary')).click();
  }

  isRetrieveBookingEnabled() {
    return element(by.css('input.btn-primary')).isEnabled();
  }

  isPassengerShown() {
    return element(by.css('label.result-flight.block')).isDisplayed();
  }
}
