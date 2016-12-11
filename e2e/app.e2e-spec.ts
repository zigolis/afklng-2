import { KlmPage } from './app.po';

describe('klm App', function() {
  let page: KlmPage;

  beforeEach(() => {
    page = new KlmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
