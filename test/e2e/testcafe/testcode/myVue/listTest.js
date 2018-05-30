import { Selector } from 'testcafe';
import Object from '../../model/listTest-model';

fixture('listTest')
.page('http://localhost:3000/listTest')
.before(async ctx  => {
    ctx.someProp = 123;
})
.after(async ctx  => {
    console.log(ctx.someProp); // > 123
});

// Object model
const object = new Object();

test('檢查基本頁面元素', async testController => {  
    await testController
    .expect(Selector('div#listExample > div.row > div.col-12 > button#isFilterAll').innerText).contains('全部')
    .expect(Selector('div#listExample > div.row > div.col-12 > button#isFilterUndo').innerText).contains('未完成')
    .expect(Selector('div#listExample > div.row > div.col-12 > button#isFilterComplete').innerText).contains('已完成');
});

test('新增5個工作', async testController => {  
    await testController
    .typeText(object.inputJob, 'job1')
    .expect(object.inputJob.value).eql('job1').pressKey('enter')
    .expect(Selector('div#listExample > ul > li > div > label > span').innerText).eql('job1')
    .typeText(object.inputJob, 'job2')
    .expect(object.inputJob.value).eql('job2').pressKey('enter')
    .expect(Selector('input.form-check-input[index="1"]').visible).ok()
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > span').innerText).eql('job2')
    .typeText(object.inputJob, 'job3')
    .expect(object.inputJob.value).eql('job3').pressKey('enter')
    .expect(Selector('input.form-check-input[index="2"]').visible).ok()
    .expect(Selector('div#listExample > ul > li:nth-child(3) > div > label > span').innerText).eql('job3')
    .typeText(object.inputJob, 'job4')
    .expect(object.inputJob.value).eql('job4').pressKey('enter')
    .expect(Selector('input.form-check-input[index="3"]').visible).ok()
    .expect(Selector('div#listExample > ul > li:nth-child(4) > div > label > span').innerText).eql('job4')
    .typeText(object.inputJob, 'job5')
    .expect(object.inputJob.value).eql('job5').pressKey('enter')
    .expect(Selector('input.form-check-input[index="4"]').visible).ok()
    .expect(Selector('div#listExample > ul > li:nth-child(5) > div > label > span').innerText).eql('job5')
    .expect(Selector('span#isFilterAllNumber').innerText).eql('5')
    .expect(Selector('span#isFilterUndoNumber').innerText).eql('5')
    .expect(Selector('span#isFilterCompleteNumber').innerText).eql('0');
});

test('編輯1個工作', async testController => {  
    object.input_five_Job(testController);

    await testController
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > button.btn-success'))
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > span').visible).eql(false)
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]').visible).ok()
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]').value).eql('job2')
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]')).pressKey('ctrl+a delete')
    .typeText(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]'), 'new-job2').pressKey('enter')
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="text"]').value).eql('new-job2');
});

test('完成3個工作', async testController => {  
    object.input_five_Job(testController);

    await testController
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="checkbox"]'))
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > span').hasClass('text-danger')).eql(true)
    .click(Selector('div#listExample > ul > li:nth-child(3) > div > label > input[type="checkbox"]'))
    .expect(Selector('div#listExample > ul > li:nth-child(3) > div > label > span').hasClass('text-danger')).eql(true)
    .click(Selector('div#listExample > ul > li:nth-child(5) > div > label > input[type="checkbox"]'))
    .expect(Selector('div#listExample > ul > li:nth-child(5) > div > label > span').hasClass('text-danger')).eql(true)
    .expect(Selector('span#isFilterUndoNumber').innerText).eql('2')
    .expect(Selector('span#isFilterCompleteNumber').innerText).eql('3');
});

test('刪除2個工作', async testController => {  
    object.input_five_Job(testController);

    await testController
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(3) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(5) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(1) > div > button.btn-danger'))
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > button.btn-danger'))
    .expect(Selector('div#listExample > ul > li:nth-child(1) > div > label > span').innerText).eql('job2')
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > span').innerText).eql('job4')
    .expect(Selector('div#listExample > ul > li:nth-child(3) > div > label > span').innerText).eql('job5')
    .expect(Selector('span#isFilterAllNumber').innerText).eql('3')
    .expect(Selector('span#isFilterUndoNumber').innerText).eql('1')
    .expect(Selector('span#isFilterCompleteNumber').innerText).eql('2');
});

test('切換到未完成頁', async testController => {  
    object.input_five_Job(testController);

    await testController
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(3) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(5) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(1) > div > button.btn-danger'))
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > button.btn-danger'))
    .click(Selector('button#isFilterUndo'))
    .expect(Selector('div#listExample > ul > li:nth-child(1) > div > label > span').innerText).eql('job4');
});

test('切換到已完成頁', async testController => {  
    object.input_five_Job(testController);

    await testController
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(3) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(5) > div > label > input[type="checkbox"]'))
    .click(Selector('div#listExample > ul > li:nth-child(1) > div > button.btn-danger'))
    .click(Selector('div#listExample > ul > li:nth-child(2) > div > button.btn-danger'))
    .click(Selector('button#isFilterComplete'))
    .expect(Selector('div#listExample > ul > li:nth-child(1) > div > label > span').innerText).eql('job2')
    .expect(Selector('div#listExample > ul > li:nth-child(2) > div > label > span').innerText).eql('job5');
});