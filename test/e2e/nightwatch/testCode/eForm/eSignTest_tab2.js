module.exports = {
    '@tags': ['esign','tab2'],
    //登入
    before : function(browser) {
        browser.url(browser.globals.elements.eform_url);
        browser.setValue('input#userId', browser.globals.elements.user_id);
        browser.setValue('input#password', browser.globals.elements.password);
        browser.click('button#btnLogin');
    },
    //登出
    after : function(browser) {
        
    },
      '檢查傳簽頁面' : function (browser) {
        browser
        .url(browser.globals.elements.eSign_url_1)
        .assert.title('簽呈')
        .pause(1000)
        .click('#a-tab2', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .waitForElementVisible('#signHistoryBlock')
        .assert.containsText('div.nowStep[flow_id="1"] > .message-text > div.finishTime', '2018-1-4 下午5:57:45')
        .assert.containsText('div.nowStep[flow_id="1"] > .message-name', '開始')
        .assert.containsText('div.message-received[flow_id="3"] > .message-text > div.finishTime', '2018-1-4 下午6:00:11')
        .assert.elementPresent('div.flowOpinion[flow_id="3"] > img[src="resources/img/manager2.gif"]')
        .assert.containsText('div.message-received[flow_id="4"] > .message-name', '徵詢／請示')
        .assert.containsText('div.message-received[flow_id="4"] > .message-text > div.finishTime', '2018-1-4 下午6:01:46')
        .assert.elementPresent('div.flowOpinion[flow_id="4"] > p > img[src="resources/img/msgr.gif"]')
        .assert.containsText('div.flowOpinion[flow_id="4"]', '456')
        .assert.elementPresent('div.message-received[flow_id="4"] > div.message-received[flow_id="6"]')
        .assert.containsText('div.message-received[flow_id="6"] > .message-name', '主管審核')
        .assert.containsText('div.message-received[flow_id="6"] > .message-text > div.finishTime', '2018-1-4 下午6:02:56')
        .assert.elementPresent('div.flowOpinion[flow_id="6"] > img[src="resources/img/manager2.gif"]')
        .assert.containsText('div.message-received[flow_id="5"] > .message-name', '呈核')
        .assert.elementPresent('div.flowOpinion[flow_id="5"] > img[src="resources/img/manager2.gif"]')
        .assert.containsText('div.message-received[flow_id="5"] > .message-text > div.finishTime', '2018-1-4 下午6:03:49')
        .assert.containsText('div.message-received[flow_id="2"] > .message-name', '平行會文')
        .assert.containsText('div.flowOpinion[flow_id="2"]', 'okok')
        .assert.elementPresent('div.message-received[flow_id="2"] > i.grey')
        .assert.containsText('div.message-received[flow_id="2"] > .message-text > div.finishTime', '2018-5-14 上午11:14:51')
        .assert.elementPresent('div.message-received[flow_id="7"] > i.blue')
        .assert.containsText('div.message-received[flow_id="7"] > .message-name', '會文後回覆')
        .end();
      }
    };