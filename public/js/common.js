$(function () {	
    setToastr();
});

function setToastr(){
    toastr.options = {  
        closeButton: true,  
        debug: false,  
        progressBar: false,  
        positionClass: "toast-top-center",  
        onclick: null,  
        showDuration: "300",  
        hideDuration: "1000",  
        timeOut: "2000",  
        extendedTimeOut: "1000",  
        showEasing: "swing",  
        hideEasing: "linear",  
        showMethod: "fadeIn",  
        hideMethod: "fadeOut"  
    };  
}