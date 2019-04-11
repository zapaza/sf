$(document).ready(function () {

    var $body = $('body');


    var mywindow = $(window);
    var mypos = 68;
    var up = false;
    var newscroll;
    var scrollEnd =  $('.page-content').offset().top + $('.page-content').innerHeight() - $('.company-sidebar').innerHeight();
    mywindow.scroll(function () {
        newscroll = mywindow.scrollTop();
        if (newscroll > mypos && !up) { //если есть прокрутка в низ
            if($('#show-menu').hasClass('open')){
                $('.header').stop().removeClass('scroll-bottom');
                up = !up;
            } else {
                $('.header').stop().addClass('scroll-bottom');
                up = !up;
            }

        } else if(newscroll < mypos && up) { //если прокрутка в верх
            $('.header').stop().removeClass('scroll-bottom');
            up = !up;
        }
        // проверка на анимацию шапки
        if ( $('.header').hasClass('scroll-bottom')){
            $('.company-sidebar').addClass('fixed');
        } else {
            $('.company-sidebar').removeClass('fixed');
        }
        // условие прокрутки по размеру стрницы
        if($(window).scrollTop() >= scrollEnd) {
            $('.company-sidebar').addClass('overflow-height');
            // $('.company-sidebar').css('position', 'relative');
            // $('.company-sidebar').css('align-self', 'flex-end');
            // $('.company-sidebar').css('top', '30');
            // $('.company-content').css('margin', '0');

        } else{
            $('.company-sidebar').removeClass('overflow-height');
            // $('.company-content').removeAttr("style");
        }
        mypos = newscroll;
    });





//фокус поиска
    $('#query').on('keyup',function(){
        var $this = $(this),
            val = $this.val();

        if(val.length >= 1){
            $(this).closest('form').find('.header-search--btn_reset').fadeIn('200');
            $(this).closest('form').find('.header-search--btn').css('opacity','1');
        }else {
            $(this).closest('form').find('.header-search--btn_reset').fadeOut('200');
            $(this).closest('form').find('.header-search--btn').css('opacity','.4');
        }
    });

    $body.on('click', '.header-search--btn_reset', function () {
       $(this).fadeOut('fast');
       $(this).closest('form').find('.header-search--btn').css('opacity','.4');
    });


    //скрол по якорю
    $body.on("click",".company-sidebar a", function (e) {
        e.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top - 70;
        $('body,html').animate({scrollTop: top}, 1000);
    });

    //показ меню
    $body.on('click', '#show-menu', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
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

    //скрипт показа модалки
    $('a[data-modal]').magnificPopup({
        type: 'inline',
        midClick: true,
        fixedBgPos: true,
        preloader: false,
        overflowY: 'scroll',
        removalDelay: 300,
        closeBtnInside: true,
        mainClass: 'zoom-in'
    });
    //модалка авторизации
    $('a[data-modal-authorization]').magnificPopup({
        type: 'inline',
        midClick: true,
        fixedBgPos: true,
        preloader: false,
        overflowY: 'scroll',
        removalDelay: 300,
        closeBtnInside: false,
        mainClass: 'zoom-in authorization'
    });

    //показ пароля
    $body.on('click', '.show-password', function (e) {
        e.preventDefault();
        var passwordInput = $(this).closest('label').find('input.password'),
            typeInput = passwordInput.attr('type') == "text" ? "password" : 'text';
            passwordInput.prop('type', typeInput);
            $(this).toggleClass('show');
    });

});


