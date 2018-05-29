const config = require('../../../../config/nightwatchConfig');

exports.command = function(){
    var browser = this;
   browser
    .url(config.eform_url)
    .setValue('input#userId', config.user_id)
    .setValue('input#password', config.password)
    .click('button#btnLogin');
    
    return this;
}