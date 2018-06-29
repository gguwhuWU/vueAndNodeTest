$(function () {	
    SwitchToggleScale();
    StartComponents();
});

function SwitchToggleScale(){
    $('#scale-demo-trigger').click(function(){

        var instance = M.FloatingActionButton.getInstance($('.fixed-action-btn'));
        
        if ($('#scale-demo').hasClass("scale-out"))
        {
            instance.close();
            $('#scale-demo').removeClass("scale-out");
        }
        else
        {
            instance.open();
            $('#scale-demo').addClass("scale-out");
        }
    });
}

function StartComponents(){
    $('.collapsible').collapsible();
    $('.tabs').tabs();
    //$('.fixed-action-btn').floatingActionButton();
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left', // Direction menu comes out -> default Top
        hoverEnabled: false, // Hover enabled -> default true
        toolbarEnabled: false // Toolbar transition enabled
    });

    // css 要增加 (toolbar) ex:  <div class="fixed-action-btn toolbar">  
    // $('.fixed-action-btn').floatingActionButton({
    //     toolbarEnabled: true
    // });

    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
}