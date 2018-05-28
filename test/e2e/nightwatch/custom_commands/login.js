 const eform_url = '';
 const user_id = '';
 const password = '';

exports.command = function(){
    var browser = this;
   browser
    .url(eform_url)
    .setValue('input#userId', user_id)
    .setValue('input#password', password)
    .click('button#btnLogin');
    
    return this;
}