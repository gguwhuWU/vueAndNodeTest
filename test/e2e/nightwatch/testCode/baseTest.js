module.exports = {
    'Demo test w3.org' : function (client) {
        client
        .url('https://www.w3.org/')
        .waitForElementVisible('#region_form')
        .click('#region_form select')
        .click('#region_form select option[value="all"]')
        .click('input[type=submit]', function(result) {
          this.assert.strictEqual(result.status, 0);
        });
      },
    'Demo test Google' : function (client) {
      client
      .url('http://www.google.com')
      .waitForElementVisible('body', 5000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', ['rembrandt van rijn', client.Keys.ENTER])
      .waitForElementVisible('button[name=btnG]', 5000)
      .click('button[name=btnG]')
      .pause(3000)
      .assert.containsText('#rso > div > div > div:nth-child(2) > div > div > h3 > a',
      'Rembrandt - Wikipedia')
      .end();
    }
  };