import { KlmPage } from './app.po';

describe('klm App', function() {
  let page: KlmPage;

  beforeEach(() => {
    page = new KlmPage();
  });

  it('should display message saying retrive your booking', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('RETRIEVE YOUR BOOKING');
  });

  it('should enable Retrieve Booking button if a valid formatted Booking Code and Family name are entered ', () => {
    page.navigateTo();
    page.addBookingCode("AB234");
    page.addFamilyName("Zigolis")
    expect(page.isRetrieveBookingEnabled()).toBeTruthy();
  });

  it('should retrieve booking info if input data is correct and button is clicked', () => {
    page.navigateTo();
    page.addBookingCode("AB234");
    page.addFamilyName("Zigolis");
    page.clickRetrieveBooking();
    expect(page.isPassengerShown()).toBeTruthy();
   });
});
