var $body = $('body'),
    ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart" : "click";

$body.on(event,'.main-block-media', function () {
    var id = $('.tariffs'),
        top = $(id).offset().top - 70;
    $('body,html').animate({scrollTop: top}, 1000);
});

$body.on(event, '.engineering-works-close', function (e) {
    e.preventDefault();
    $('.engineering-works').fadeOut(200).removeClass('show');
    $('.mobil-factors').attr('style', '');
} );

$(document).ready(function () {
    if($(window).width <= 412 || $('.engineering-works').hasClass('show')){
        let heightMassage = $('.engineering-works').innerHeight(),
            bottomPositonBtn = heightMassage + 24;

        console.log(bottomPositonBtn);
        $('.mobil-factors ').css('bottom', bottomPositonBtn )
    }else{
        $('.mobil-factors').attr('style', '');
    }
});
