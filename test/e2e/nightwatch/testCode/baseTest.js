module.exports = {
  //test suite 開始前，也就是在該檔案所有 test case 開始前會執行的程式碼區塊。
  before : function(browser) {
    console.log('Setting up...');
  },
  //test suite 結束後，也就是在該檔案所有 test case 結束後會執行的程式碼區塊。
  after : function(browser) {
    console.log('Closing down...');
  },
  //在該檔案每個 test case 開始前執行的程式碼區塊。
  beforeEach : function(browser) {
    console.log('Before each test case...');
  },
  //在該檔案每個 test case 結束後執行的程式碼區塊。
  afterEach : function(browser, done) {
    console.log('After each test case...');
    done();
  },
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
      .url('http://www.google.com')// 打開網頁
      .setWindowPosition(100, 100)//設定目前 window 的位置
      .resizeWindow(500, 500)//調整目前 window 的大小。
      .waitForElementVisible('body', 5000)// 等待 5 秒，確認 <body> 這個元素是否可見
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .assert.visible('img[id="hplogo"]')
      .assert.attributeContains('.sbico-c', 'aria-label', '搜尋')
      .getCookie('NID', result => {//取得特定 cookie 的値
        client.assert.equal(result.name, 'NID');
        client.assert.equal(typeof result.value, 'string');
      })
      .getCookies(result => {//取得所有可得的 cookie
        client.assert.strictEqual(result.status, 0);
      })
      .setValue('input[type=text]', ['rembrandt van rijn', client.Keys.ENTER])
      .waitForElementVisible('button[name=btnG]', 5000)
      .click('button[name=btnG]')
      .maximizeWindow()//將目前 window 展開到最大。
      .pause(3000)
      .assert.containsText('#rso > div > div > div:nth-child(2) > div > div > h3 > a',
      'Rembrandt - Wikipedia')
      .end();
    },
    'Demo test Google 2' : function (browser) {
      browser.url('http://www.google.com');
      browser.expect.element('img[id="hplogo"]').to.have.attribute('alt');
      browser.expect.element('input[id="lst-ib"]').to.have.value.that.equals('');
      browser.expect.element('input[name="btnK"]').to.have.value.that.equals('Google 搜尋');
      browser.expect.element('input[name="btnI"]').to.have.value.that.equals('好手氣');
      browser.assert.attributeContains('.sbico-c', 'aria-label', '搜尋');
      browser.assert.attributeEquals('.sbico-c', 'aria-label', 'Google 搜尋');
      browser.assert.cssClassPresent('.gstl_0', 'sbib_a');
      browser.assert.cssProperty('.gsst_b', 'line-height', '44px');
      browser.assert.elementPresent('.lst-c');
      //browser.verify.value('.sbico-c', '錯誤');//斷言失敗時，會把測試失敗記綠下來，然後繼續剩餘未執行的部份。
      browser.assert.value('.sbico-c', '搜尋');
      browser.end();
    }
  };
