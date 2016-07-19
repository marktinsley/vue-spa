module.exports = {
  'anyone can register for an account': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('nav', 5000)
      .click('.gnb-NavBar__register-button')
      .setValue('[name=name]', 'One Name, Two Name')
      .setValue('[name=email]', 'email@address.com')
      .setValue('[name=password]', 'mypassword')
      .setValue('[name=password_confirmation]', 'mypassword')
      .submitForm('form')
      .waitForElementVisible('.alert.alert-success', 1000)
      .end()
  }
}
