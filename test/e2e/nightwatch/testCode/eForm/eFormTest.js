module.exports = {
    '@tags': ['eform'],
    //登入
    before : function(browser) {
        browser.login();
    },
    //登出
    after : function(browser) {
        
    },
    '基本頁面顯示' : function (browser) {
        browser.
        url(browser.globals.elements.eform_url)
        .assert.title('電子公文手機版')
        .verify.cssProperty('div#customLogo', 'width', '40px')
        .verify.cssProperty('div#customLogo', 'height', '35px')
        .assert.containsText('.customNavbarTitle', '電子公文')
        .assert.visible('.icon-plus')
        .assert.elementPresent('.icon-close')
        .getCookie('UID', result => {//取得特定 cookie 的値
            browser.assert.equal(result.name, 'UID');
            browser.assert.equal(typeof result.value, 'string');
        })
        .assert.elementPresent('.signType')
        .assert.elementPresent('.emergencyType')
        .assert.elementPresent('.signTitle')
        .assert.elementPresent('.signAuthor')
        .assert.elementPresent('.signStartTime');
      },
      '點開右上角功能鍵' : function (browser) {
        browser
        .pause(1000)
        .click('.floating-button', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.visible('.material-icons')
        .assert.visible('.customTextFormat');
      },
      '開啟放大縮小功能' : function (browser) {
        browser
        .waitForElementVisible('a#textFormat')
        .click('a#textFormat', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.visible('#toolbarBottom');
      },
      //關閉放大縮小功能 失敗
      //關閉右上角功能鍵 失敗
      '點開一篇公文' : function (browser) {
        browser
        .click('a[href="'+browser.globals.elements.eSign_url_1+'"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.title('簽呈')
        .end();
      }
    };