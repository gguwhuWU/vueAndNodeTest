module.exports = {
    '@tags': ['esign','tab1'],
    //登入
    before : function(browser) {
        browser.login();
    },
    //登出
    after : function(browser) {
        
    },
      '基本頁面顯示' : function (browser) {
        browser
        .url(browser.globals.elements.eSign_url_1)
        .assert.title('簽呈')
        .verify.containsText('.ellipsisTitle','測試-會文回覆加徵詢')
        .assert.cssClassPresent('#a-tab1', 'active')
        .verify.value('#signTitleArea', '測試-會文回覆加徵詢')
        .assert.containsText('.signAuthor', '李秉奕/程式設計師/聯經數位資服部四組')
        .assert.containsText('.signNo', '003-180104-0014')
        .verify.containsText('.signContent > p', '453435');
      },
      '檢查外層資訊項目' : function (browser) {
        browser
        .pause(1000)
        .click('#content-block-title-info', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.cssClassPresent('.accordion-item', 'accordion-item-expanded')
        .assert.containsText('#AbstractInfoIcon', '摘要資訊')
        .waitForElementVisible('div[reasonno="8"]')
        .verify.containsText('div[reasonno="8"]', '其他')
        .verify.containsText('#ListReasonHeader', '會議決議, 例辦, 其他')
      },
      '檢查外層資訊項目' : function (browser) {
        browser
        .pause(1000)
        .click('#content-block-title-info', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .click('#AbstractInfo', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .verify.containsText('div#UrgentContainer > .AbstractInfoHeader', '一般')
        .verify.containsText('#SecretyContainer > .AbstractInfoHeader', '密')
        .verify.containsText('a.openArticleClass > .abstractDetail > .AbstractInfoHeader', '印務')
        .verify.containsText('a#openKeyword > .abstractDetail > .AbstractInfoHeader', '9709工作計畫')
      },
      '檢查擬辦資訊' : function (browser) {
        browser
        .pause(1000)
        .click('#planContent-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('a[href="#planDetail"]')
        .verify.containsText('a[href="#planDetail"]', '查看資訊')
        .click('a[href="#planDetail"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('div[data-page="planDetail"]')
        .assert.containsText('div[data-page="planDetail"] > div.page-content > div.content-block > div#signIndex > div.navbar > div.navbar-inner > .center', '擬辦資訊')
        .assert.containsText('ul#planDetail-accordion-item-ul > li.planDetail-accordion-item-li > #planIndex', '擬辦項目1')
        .verify.containsText('#planTitle', '全案 / 測試-會文回覆加徵詢')
        .verify.containsText('#planManager', '李秉奕')
        .verify.containsText('#planExceptEndDay', '20180105')
        .end();
      }
    };