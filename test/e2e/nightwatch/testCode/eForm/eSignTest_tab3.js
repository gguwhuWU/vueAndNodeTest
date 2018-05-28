module.exports = {
    '@tags': ['esign','tab3'],
    //登入
    before : function(browser) {
        browser.login();
    },
    //登出
    after : function(browser) {
        
    },
      '檢查批核頁面' : function (browser) {
        browser
        .url(browser.globals.elements.eSign_url_1)
        .assert.title('簽呈')
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .assert.elementPresent('div#customStatus')
        .assert.containsText('#SenderType', '會文後回覆')
        .assert.elementPresent('div#customOpinion')
        .assert.elementPresent('a[data-popover=".picker-setUserInfo"]')
        .assert.containsText('a[data-open-in="picker"]', '常用片語')
        .assert.containsText('#addCommonPhrase', '加入片語')
        .assert.containsText('#NonDisplayListDiv > a', '不顯示徵詢列表')
        .assert.containsText('#ProcessTitle', '流程設定')
        ;
      },
      '檢查批核-常用片語' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .waitForElementVisible('a[data-open-in="picker"]')
        .click('a[data-open-in="picker"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('.smart-select-picker')
        .click('.smart-select-picker > div.toolbar > div.toolbar-inner > div.right > a.link', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('textarea#OpinionReply')
        .assert.valueContains('textarea#OpinionReply', 'test123450000')
        ;
      },
      '檢查批核-不顯示徵詢列表' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('a[href="#nonDisplayConsultList"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('div[data-page="nonDisplayConsultList"]')
        .assert.containsText('div[data-page="nonDisplayConsultList"] > div.page-content > div.content-block > div#signIndex > div.navbar > div.navbar-inner > .center ', '不顯示徵詢列表')
        .assert.containsText('.label-switch > .consultMemberName', '徵詢／請示')
        .pause(1000)
        .click('div[data-page="nonDisplayConsultList"] > div.page-content > div.content-block > div#signIndex > div.navbar > div.navbar-inner > .left > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        ;
      },
      '檢查批核-流程設定' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('#Process-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ProcessButtonUpperLayer')
        .assert.containsText('#ProcessButtonUpperLayer > #consultList-switch', '徵詢請示')
        .assert.containsText('#ProcessButtonUpperLayer > div[btnname="btnBack"]', '退補')
        .assert.hidden('#ProcessButtonUpperLayer > div[btnname="btnTrans"]')
        .assert.hidden('#ProcessButtonUpperLayer > div[btnname="btnReadend"]')
        .waitForElementVisible('#ProcessButtonLowerLayer')
        .assert.containsText('#ProcessButtonLowerLayer > #signerList-switch', '加呈')
        .assert.containsText('#ProcessButtonLowerLayer > #notifyList-switch', '加會')
        .assert.containsText('#ProcessButtonLowerLayer > #ccList-switch', '副本')
        ;
      },
      '檢查批核-流程設定-徵詢請示' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('#Process-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ProcessButtonUpperLayer')
        .click('#ProcessButtonUpperLayer > #consultList-switch', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.visible('#consultList-li')
        .assert.visible('#consultList-li > div.card-content > a.btnConsult')
        .assert.containsText('#consultList-li > div.card-content > a.btnConsult', '增加')
        .assert.visible('#consultList-li > div.card-content > a.btnFavoriteList')
        .assert.containsText('#consultList-li > div.card-content> a.btnFavoriteList', '常用清單')
        ;
      },
      '檢查批核-流程設定-呈核' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('#Process-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ProcessButtonLowerLayer')
        .click('#ProcessButtonLowerLayer > #signerList-switch', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.visible('#signerList-li')
        .assert.visible('#signerList-li > div.card-content > a.btnSign')
        .assert.containsText('#signerList-li > div.card-content > a.btnSign', '增加')
        .assert.visible('#signerList-li > div.card-content > a.btnFavoriteList')
        .assert.containsText('#signerList-li > div.card-content> a.btnFavoriteList', '常用清單')
        .assert.visible('#signerList-li > div.card-content > a#btnSupervisorList')
        .assert.containsText('#signerList-li > div.card-content> a#btnSupervisorList', '載入上層主管')
        ;
      },
      '檢查批核-流程設定-會文' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('#Process-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ProcessButtonLowerLayer')
        .click('#ProcessButtonLowerLayer > #notifyList-switch', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.visible('#notifyList-li')
        .assert.visible('#notifyList-li > div.card-content > a.btnFavoriteList')
        .assert.visible('#notifyList-li > div.card-content > a.btnNotify')
        .assert.containsText('#notifyList-li > div.card-content> a.btnNotify[stafforunit="1"]', '員工加會')
        .assert.containsText('#notifyList-li > div.card-content> a.btnNotify[stafforunit="0"]', '單位加會')
        .assert.containsText('#notifyList-li > div.card-content> a.btnFavoriteList', '常用清單')
        .assert.visible('#notifyList-li > div.card-content > a.btnMerge')
        .assert.containsText('#notifyList-li > div.card-content > a.btnMerge', '合併')
        .assert.visible('#notifyList-li > div.card-content > a.btnSegment')
        .assert.containsText('#notifyList-li > div.card-content > a.btnSegment', '分割')
        ;
      },
      '檢查批核-流程設定-副本' : function (browser) {
        browser
        .pause(1000)
        .click('#a-tab3', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('form#signReply')
        .click('#Process-accordion-item-Div > a', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ProcessButtonLowerLayer')
        .click('#ProcessButtonLowerLayer > #ccList-switch', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#ccList-li > div.card-content > a.btnCC')
        .assert.containsText('#ccList-li > div.card-content > a.btnCC', '增加')
        .waitForElementVisible('#ccList-li > div.card-content > a.btnFavoriteList')
        .assert.containsText('#ccList-li > div.card-content> a.btnFavoriteList', '常用清單')
        .click('#ccList-li > div.card-content > a.btnFavoriteList', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.containsText('.popover-on-bottom > .popover-inner > .content-block > p', '常用人員群組')
        .click('body', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .end();
      }
    };