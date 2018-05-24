module.exports = {
    '@tags': ['t2', 'point'],
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
  