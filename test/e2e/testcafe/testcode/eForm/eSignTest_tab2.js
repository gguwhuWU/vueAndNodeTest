import { Selector } from 'testcafe';
import Object from '../../model/eForm-model';

// Object model
const object = new Object();

fixture('eSignTab2')
.page(object.eform_url)
.beforeEach(async ctx  => {
    //login
    await object.login(ctx);
});

test('檢查傳簽頁面', async testController => {
    await testController
    .navigateTo(object.eSign_url_1)
    .click(Selector('#a-tab2'))
    .expect(Selector('div.nowStep[flow_id="1"] > .message-text > div.finishTime').innerText).contains('2018-1-4 下午5:57:45')
    .expect(Selector('div.nowStep[flow_id="1"] > .message-name').innerText).contains('開始')
    .expect(Selector('div.message-received[flow_id="3"] > .message-text > div.finishTime').innerText).contains('2018-1-4 下午6:00:11')
    .expect(Selector('div.flowOpinion[flow_id="3"] > img[src="resources/img/manager2.gif"]').visible).ok()
    ;
});