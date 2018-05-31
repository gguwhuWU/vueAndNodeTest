import { Selector } from 'testcafe';
import { RequestMock } from 'testcafe';
import { RequestLogger } from 'testcafe';

const requestMock = RequestMock()
    .onRequestTo('http://localhost:3000/user?id=70915')
    .respond({"name":"ttt","password":"123456789"})
    ;
const requestLogger = RequestLogger('http://localhost:3000/user?id=70915');

fixture('ajaxTest')
.page('http://localhost:3000/ajaxTest')
;

//mock 回傳的資料
test.requestHooks(requestMock, requestLogger)
    ('取得使用者資料', async testController => {
        

        await testController
        .typeText(Selector('input#UserId'), '70915')
        .expect(Selector('input#UserId').value).eql('70915')
        .click(Selector('button#getUserData'))
        .expect(Selector('input[aria-label="Username"]').value).eql('ttt')
        .expect(requestLogger.contains(record => record.response.statusCode === 200)).ok()
        ;

        console.log(requestLogger);
        const logRecord = requestLogger.requests[0];

        console.log(logRecord.userAgent);           // Chrome 63.0.3239 / Windows 8.1.0.0
        console.log(logRecord.request.url);         // http://api.example.com
        console.log(logRecord.request.method);      // get
        console.log(logRecord.response.statusCode); // 200
});

// 正常使用
// test('取得使用者資料', async testController => {  
//     await testController
//     .typeText(Selector('input#UserId'), '70915')
//     .expect(Selector('input#UserId').value).eql('70915')
//     .click(Selector('button#getUserData'))
//     .expect(Selector('input[aria-label="Username"]').value).eql('huanyu wu')
//     ;
// });