$(document).ready(function () {

    var $body = $('body');
    // var mywindow = $(window);
    // var mypos = 64;
    // var up = false;
    // var newscroll;
    // var scrollEnd =  $('.company').offset().top + $('.company').innerHeight() - $('.company-sidebar').innerHeight();
    // mywindow.scroll(function () {
    //     newscroll = mywindow.scrollTop();
    //     if (newscroll > mypos && !up) {
    //         $('.header').stop().toggleClass('scroll-bottom');
    //         up = !up;
    //     } else if(newscroll < mypos && up) {
    //         $('.header').stop().toggleClass('scroll-bottom');
    //         up = !up;
    //     }
    //
    //     if ( $('.header').hasClass('scroll-bottom')){
    //         $('.company-sidebar').addClass('fixed');
    //     } else {
    //         $('.company-sidebar').removeClass('fixed');
    //     }
    //
    //     if($(window).scrollTop() >= scrollEnd) {
    //         $('.company-sidebar').addClass('overflow-height');
    //         // $('.company-sidebar').css('position', 'relative');
    //         // $('.company-sidebar').css('align-self', 'flex-end');
    //         // $('.company-sidebar').css('top', '30');
    //         // $('.company-content').css('margin', '0');
    //
    //     } else{
    //         $('.company-sidebar').removeClass('overflow-height');
    //         // $('.company-content').removeAttr("style");
    //     }
    //     mypos = newscroll;
    // });
    //
    //

    //скрол по якорю
    $("body").on("click",".company-sidebar a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top - 70;
        $('body,html').animate({scrollTop: top}, 1000);
    });



    //показ меню
    $body.on('click', '#show-menu', function (e) {
        e.preventDefault();
        $('#lk-menu').fadeToggle('500');
    });



    //скрипты для карточки тендер
    if($('.tender').length > 0){
        //анимация чекбокса
        $body.on('click', '.tender-tabs--name',function(){
            if (!$(this).hasClass('active')){

                $(this).css('points-events','all');
                $(this).closest('.tender-tabs').children('.tender-tabs--name').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.tender-tabs').find('.tender-select--input').trigger('click');
            }

        });

        //табы в
        $(".tender-content-tab").hide();
        $(".tender-content-tab:first").show();

        /* if in tab mode */
        $body.on("click", ".tender-tabs .tender-tabs--name", function () {

            $(".tender-content-tab").hide();

            var activeTab = $(this).attr("rel");

            $("#" + activeTab).fadeIn();

            $(".tender-tabs .tender-tabs--name").removeClass("active");
            $(this).addClass("active");

            // $(".tab-drawer-heading").removeClass("d-active");
            // $(".tab-drawer-heading[rel^='" + activeTab + "']").addClass("d-active");

        });
    }


});


