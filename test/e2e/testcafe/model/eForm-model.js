import { Selector } from 'testcafe';
const config = require('../../../../config/eFormConfig');

export default class ListTest {
    constructor () {
        this.eSign_url_1 = config.eSign_url_1;
        this.eform_url = config.eform_url;
    }

    async login (t) {

        await t
            .typeText(Selector('input#userId'), config.user_id)
            .typeText(Selector('input#password'), config.password)
            .click(Selector('button#btnLogin'));
    }
}