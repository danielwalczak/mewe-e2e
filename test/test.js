const webdriverio = require('webdriverio');
const assert = require('assert');

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

describe('webdriver.io page', () => {
  let client;

  before(() => {
    client = webdriverio.remote(options);
    return client.init();
  });

  it('registration fails when age is under 13', () => {
    return client
      .url('http://www.mewe.com')
      .setValue('#reg-user-age', 12)
      .isVisible('#age-law-err')
      .then(isVisible => assert.equal(isVisible, true));
  });

  it('when user clicks on "Terms of Service" link under registration, new dialog with terms is open', () => {
    return client
      .url('http://www.mewe.com')
      .click('#terms-of-service')
      .isVisible('#terms-dialog')
      .then(isVisible => assert.equal(isVisible, true));
  });

  it('/privacy page exists, is accesible and there is displayed "SIGN UP FOR FREE!" button', () => {
    return client
      .url('http://www.mewe.com/privacy')
      .getTitle()
      .then(title => assert.equal(title, 'MeWe - The Next-Gen Social Network | Privacy Policy'))
      .getText('.orange-btn')
      .then(text => assert.equal(text, 'SIGN UP FOR FREE!'));
  });

  after(() => {
    client.end();
  })
});
