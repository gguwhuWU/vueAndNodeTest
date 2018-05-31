import { Selector } from 'testcafe';
import Object from '../../model/eForm-model';

// Object model
const object = new Object();

fixture('eFormTest')
.page(object.eform_url)
.beforeEach(async ctx  => {
    //login
    await object.login(ctx);
});

test('基本頁面顯示', async testController => {
    await testController
    .expect(Selector('div#customLogo').getStyleProperty('width')).eql('40px')
    .expect(Selector('div#customLogo').getStyleProperty('height')).eql('35px')
    .expect(Selector('.customNavbarTitle').innerText).eql('電子公文')
    .expect(Selector('.icon-plus').visible).ok()
    .expect(Selector('.icon-close').visible).ok()
    .expect(Selector('.signType').visible).ok()
    .expect(Selector('.signTitle').visible).ok()
    .expect(Selector('.signAuthor').visible).ok()
    .expect(Selector('.signStartTime').visible).ok()
    ;
});

test('開關右上角功能鍵', async testController => {
    await testController
    .click(Selector('.floating-button'))
    .expect(Selector('.material-icons').visible).ok()
    .expect(Selector('.customTextFormat').visible).ok()
    .click(Selector('.floating-button'))
    .expect(Selector('.material-icons').visible).eql(false)
    .expect(Selector('.customTextFormat').visible).eql(false)
    ;
});

test('開啟關閉放大縮小功能', async testController => {
    await testController
    .click(Selector('.floating-button'))
    .click(Selector('a#textFormat'))
    .expect(Selector('#toolbarBottom').hasClass('toolbar-hidden')).eql(false)
    .click(Selector('a#textFormat'))
    .expect(Selector('#toolbarBottom').hasClass('toolbar-hidden')).eql(true)
    ;
});

test('點開一篇公文', async testController => {
    await testController
    .click(Selector('a[href="'+object.eSign_url_1+'"]'))
    .expect(Selector('.ellipsisTitle').innerText).contains('會文回覆加徵詢')
    ;
});
