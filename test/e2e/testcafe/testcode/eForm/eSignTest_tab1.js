import { Selector } from 'testcafe';
import Object from '../../model/eForm-model';

// Object model
const object = new Object();

fixture('eSignTab1')
.page(object.eform_url)
.beforeEach(async ctx  => {
    //login
    await object.login(ctx);
});

test('基本頁面顯示', async testController => {
    await testController
    .navigateTo(object.eSign_url_1)
    .expect(Selector('.ellipsisTitle').innerText).contains('會文回覆加徵詢')
    .expect(Selector('#signTitleArea').value).contains('會文回覆加徵詢')
    .expect(Selector('#a-tab1').hasClass('active')).eql(true)
    .expect(Selector('.signAuthor[data-col="COMMENT"]').value).contains('/程式設計師/聯經數位資服部四組')
    .expect(Selector('.signNo').value).contains('003-180104-0014')
    .expect(Selector('.signContent > p').innerText).contains('453435')
    ;
});

test('檢查外層資訊項目', async testController => {
    await testController
    .navigateTo(object.eSign_url_1)
    .click(Selector('#content-block-title-info'))
    .expect(Selector('.accordion-item').hasClass('accordion-item-expanded')).eql(true)
    .expect(Selector('#AbstractInfoIcon').innerText).contains('摘要資訊')
    .expect(Selector('div[reasonno="8"]').innerText).contains('其他')
    .expect(Selector('#ListReasonHeader').innerText).contains('會議決議, 例辦, 其他')
    ;
});

test('檢查外層資訊項目2', async testController => {
    await testController
    .navigateTo(object.eSign_url_1)
    .click(Selector('#content-block-title-info'))
    .click(Selector('#AbstractInfo'))
    .expect(Selector('div#UrgentContainer > .AbstractInfoHeader').innerText).contains('一般')
    .expect(Selector('#SecretyContainer > .AbstractInfoHeader').innerText).contains('密')
    .expect(Selector('a.openArticleClass > .abstractDetail > .AbstractInfoHeader').innerText).contains('印務')
    .expect(Selector('a#openKeyword > .abstractDetail > .AbstractInfoHeader').innerText).contains('9709工作計畫')
    ;
});

test('檢查擬辦資訊', async testController => {
    await testController
    .navigateTo(object.eSign_url_1)
    .click(Selector('#planContent-accordion-item-Div > a'))
    .expect(Selector('a[href="#planDetail"]').innerText).contains('查看資訊')
    .click(Selector('a[href="#planDetail"]'))
    .expect(Selector('div[data-page="planDetail"] > div.page-content > div.content-block > div#signIndex > div.navbar > div.navbar-inner > .center').innerText).contains('擬辦資訊')
    .expect(Selector('ul#planDetail-accordion-item-ul > li.planDetail-accordion-item-li > #planIndex').innerText).contains('擬辦項目1')
    .expect(Selector('#planTitle').innerText).contains('會文回覆加徵詢')
    .expect(Selector('#planManager').innerText).contains('李秉奕')
    .expect(Selector('#planExceptEndDay').innerText).contains('20180105')
    ;
});