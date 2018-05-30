module.exports = {
    '@tags': ['myVue','mylist'],
    before : function(browser) {
    },
    after : function(browser) {
    },
      '檢查基本頁面元素' : function (browser) {
        browser
        .url('http://localhost:3000/listTest')
        .assert.title('list Test')
        .waitForElementVisible('div#listExample > div.row > div.col-8 > input#inputJob')
        .assert.containsText('div#listExample > div.row > div.col-12 > button#isFilterAll', '全部')
        .assert.containsText('div#listExample > div.row > div.col-12 > button#isFilterUndo', '未完成')
        .assert.containsText('div#listExample > div.row > div.col-12 > button#isFilterComplete', '已完成')
        ;
      }
      ,
      '新增5個工作' : function (browser) {
        browser
        .waitForElementVisible('div#listExample > div.row > div.col-8 > input#inputJob')
        .setValue('input#inputJob', ['job1', browser.Keys.ENTER])
        .assert.containsText('div#listExample > ul > li > div > label > span', 'job1')
        .setValue('input#inputJob', ['job2', browser.Keys.ENTER])
        .waitForElementVisible('input.form-check-input[index="1"]')
        .assert.containsText('div#listExample > ul > li:nth-child(2) > div > label > span', 'job2')
        .setValue('input#inputJob', ['job3', browser.Keys.ENTER])
        .waitForElementVisible('input.form-check-input[index="2"]')
        .assert.containsText('div#listExample > ul > li:nth-child(3) > div > label > span', 'job3')
        .setValue('input#inputJob', ['job4', browser.Keys.ENTER])
        .waitForElementVisible('input.form-check-input[index="3"]')
        .assert.containsText('div#listExample > ul > li:nth-child(4) > div > label > span', 'job4')
        .setValue('input#inputJob', ['job5', browser.Keys.ENTER])
        .waitForElementVisible('input.form-check-input[index="4"]')
        .assert.containsText('div#listExample > ul > li:nth-child(5) > div > label > span', 'job5')
        .assert.containsText('span#isFilterAllNumber', '5')
        .assert.containsText('span#isFilterUndoNumber', '5')
        .assert.containsText('span#isFilterCompleteNumber', '0')
        ;
      }
      ,
      '編輯2個工作' : function (browser) {
        browser
        .waitForElementVisible('input.form-check-input[index="2"]')
        .click('div#listExample > ul > li:nth-child(2) > div > button.btn-success', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.hidden('div#listExample > ul > li:nth-child(2) > div > label > span')
        .assert.visible('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]')
        .verify.value('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]', 'job2')
        .clearValue('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]')
        .setValue('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]', ['new-job2', browser.Keys.ENTER])
        .verify.value('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]', 'new-job2')
        .click('div#listExample > ul > li:nth-child(4) > div > button.btn-success', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.hidden('div#listExample > ul > li:nth-child(4) > div > label > span')
        .assert.visible('div#listExample > ul > li:nth-child(4) > div > label > input[type="text"]')
        .verify.value('div#listExample > ul > li:nth-child(4) > div > label > input[type="text"]', 'job4')
        .setValue('div#listExample > ul > li:nth-child(4) > div > label > input[type="text"]', ['-update', browser.Keys.ENTER])
        .verify.value('div#listExample > ul > li:nth-child(4) > div > label > input[type="text"]', 'job4-update')
        ;
      }
      ,
      '完成3個工作' : function (browser) {
        browser
        .click('div#listExample > ul > li:nth-child(2) > div > label > input[type="checkbox"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.cssClassPresent('div#listExample > ul > li:nth-child(2) > div > label > span', 'text-danger')
        .click('div#listExample > ul > li:nth-child(3) > div > label > input[type="checkbox"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.cssClassPresent('div#listExample > ul > li:nth-child(3) > div > label > span', 'text-danger')
        .click('div#listExample > ul > li:nth-child(5) > div > label > input[type="checkbox"]', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.cssClassPresent('div#listExample > ul > li:nth-child(5) > div > label > span', 'text-danger')
        .assert.containsText('span#isFilterUndoNumber', '2')
        .assert.containsText('span#isFilterCompleteNumber', '3')
        ;
      }
      ,
      '刪除2個工作' : function (browser) {
        browser
        .click('div#listExample > ul > li:nth-child(1) > div > button.btn-danger', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .click('div#listExample > ul > li:nth-child(2) > div > button.btn-danger', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.containsText('div#listExample > ul > li:nth-child(1) > div > label > span', 'new-job2')
        .assert.containsText('div#listExample > ul > li:nth-child(2) > div > label > span', 'job4-update')
        .assert.containsText('div#listExample > ul > li:nth-child(3) > div > label > span', 'job5')
        .assert.containsText('span#isFilterAllNumber', '3')
        .assert.containsText('span#isFilterUndoNumber', '1')
        .assert.containsText('span#isFilterCompleteNumber', '2')
        ;
      }
      ,
      '切換到未完成頁' : function (browser) {
        browser
        .click('button#isFilterUndo', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.containsText('div#listExample > ul > li:nth-child(1) > div > label > span', 'job4-update')
        ;
      }
      ,
      '切換到已完成頁' : function (browser) {
        browser
        .click('button#isFilterComplete', function(result) {
            this.assert.strictEqual(result.status, 0);
        })
        .assert.containsText('div#listExample > ul > li:nth-child(1) > div > label > span', 'new-job2')
        .assert.containsText('div#listExample > ul > li:nth-child(2) > div > label > span', 'job5')
        .end();
      }
    };