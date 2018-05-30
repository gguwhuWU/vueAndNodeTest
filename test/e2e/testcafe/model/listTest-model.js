import { Selector } from 'testcafe';

// 範例 元件
/*
const label = Selector('label');

class Feature {
    constructor (text) {
        this.label    = label.withText(text);
        this.checkbox = this.label.find('input[type=checkbox]');
    }
}
*/
export default class ListTest {
    constructor () {
        /* --- 範例 元件 start ----
        this.nameInput = Selector('#developer-name');

        this.featureList = [
            new Feature('Support for testing on remote devices'),
            new Feature('Re-using existing JavaScript code for testing'),
            new Feature('Easy embedding into a Continuous integration system')
        ];

        this.slider = {
            handle: Selector('.ui-slider-handle'),
            tick:   Selector('.slider-value')
        };

        this.interfaceSelect       = Selector('#preferred-interface');
        this.interfaceSelectOption = this.interfaceSelect.find('option');
         --- 範例 元件 end ----*/

        this.inputJob = Selector('input#inputJob');
    }

    async input_five_Job (t) {
        await t
            .typeText(this.inputJob, 'job1').pressKey('enter')
            .typeText(this.inputJob, 'job2').pressKey('enter')
            .typeText(this.inputJob, 'job3').pressKey('enter')
            .typeText(this.inputJob, 'job4').pressKey('enter')
            .typeText(this.inputJob, 'job5').pressKey('enter');
    }
}