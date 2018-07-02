$(function () {	
    StartComponents();
    UseCarouselMethod();
    UseTapTarget();
    UseAutocomplete();
    UseChip();
    UseDatepicker();
    UseSelected();
    UseInput();
});

function StartComponents(){
    $('#mytest1').carousel({
        indicators: true,
        noWrap: true,
        onCycleTo: function(){
            //console.log("hi");
        }
    });

    $('#mytest2').carousel({
        fullWidth: true
    });

    $('#mytest3').carousel({
        fullWidth: true,
        indicators: true
    });

    $('#myTest5').materialbox({
        onOpenStart: function(){},
        onOpenEnd: function(){},
        onCloseStart: function(){},
        onCloseEnd: function(){}
    });

    $('#myTest6').slider();

    $('.modal').modal();

    $('.parallax').parallax();

    $('.scrollspy').scrollSpy();

    $('.sidenav').sidenav();

    $('.collapsible-header').dropdown();
    
    $('.tabs').tabs({
        swipeable: true
    });

    $('.tooltipped').tooltip();

    $('input.autocomplete').autocomplete({
        data: {
          "Apple": null,
          "Aaa": null,
          "Microsoft": null,
          "mpre": null,
          "Google": 'https://placehold.it/250x250',
          'GG': null,
          'God': null
        },
    });

    $('.chips').chips();

    $('.chips-initial').chips({
        data: [{
        tag: 'Apple',
        }, {
        tag: 'Microsoft',
        }, {
        tag: 'Google',
        }],
    });

    $('.chips-placeholder').chips({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
    });

    $('.chips-autocomplete').chips({
        autocompleteOptions: {
        data: {
            'Apple': null,
            'Microsoft': null,
            'Google': null
        },
        limit: Infinity,
        minLength: 1
        }
    });

    $('.datepicker').datepicker({
        format: 'yyyy/mm/dd',
        i18n: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            weekdaysShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            weekdaysAbbrev: ["日", "一", "二", "三", "四", "五", "六"],
            cancel: '取消',
            clear: '清除',
            done: '確定'
        }
    });
    
    $('.timepicker').timepicker({
        i18n: {
            cancel: '取消',
            clear: '清除',
            done: '確定'
        }
    });

    $('select').formSelect();
}

function UseInput(){

    $('#upTextValue').click(function(){
        $('#textarea1').val('1111111111111111111111111111111XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX000000000000000000000000000000000000000JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
        M.textareaAutoResize($('#textarea1'));
        $('#textarea1').focus();
    });

    $('input#input_text, textarea#textarea2').characterCounter();
}

function UseSelected(){
    var instance = M.FormSelect.getInstance($('#Materialize_Multiple_Select'));

    $('#showSelectedData').click(function(){
        let values = instance.getSelectedValues();
        M.toast({html: values[0]});
        console.log(values);
    });
}

function UseDatepicker(){
    var instance = M.Datepicker.getInstance($('.datepicker'));
    var instance2 = M.Timepicker.getInstance($('.timepicker'));

    $('#showDateTime').click(function(){
        M.toast({html: instance.toString()});
        M.toast({html: instance2.time});
    });

    $('#setDateTime').click(function(){
        instance.setDate(new Date(2018, 9 , 10));
        M.toast({html: 'set ok!'});
    });
}

function UseChip(){
    var instance = M.Chips.getInstance($('#myChips'));

    $('#addChipData').click(function(){
        instance.addChip({
            tag: 'new1',
            image: '',
        });
        instance.addChip({tag: 'new2'});instance.addChip({tag: 'new3'});
    });

    $('#delChipData').click(function(){
        instance.deleteChip(1);
    });
}

function UseAutocomplete(){
    var instance = M.Autocomplete.getInstance($('input.autocomplete'));

    $('#autocompleteButton').click(function(){
        instance.updateData({
            "Apple": null,
            "Aaa": null,
            "A-jojo": null,
            "Microsoft": null,
            "mpre": null,
            "m-jojo": null,
            "Google": 'https://placehold.it/250x250',
            'GG': null,
            'God': null,
            "g-jojo": null,
        });
    });
}

function UseTapTarget(){
    $('#myTab').tapTarget();

    $('#mymenu').click(function(){
        $('.tap-target').tapTarget('open');
        // var instance = M.TapTarget.getInstance($('#myTab'));
        
        // if (!instance.isOpen)
        // {
        //     $('.tap-target').tapTarget('open');
        // }
        // else
        // {
        //     $('.tap-target').tapTarget('close');
        // }
    });
}

function UseCarouselMethod(){
    var instance = M.Carousel.getInstance($('#mytest1'));

    setTimeout(function(){
        instance.next(3);
    }, 1000);

    setTimeout(function(){
        instance.prev(2);
    }, 2000);

    setTimeout(function(){
        instance.set(4);
    }, 3000);
   
    // setTimeout(function(){
    //     instance.destroy();
    // }, 4000);
}