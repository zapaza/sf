function Scrolling(){
    //анимация скролинга страницы
    if(!$('body').hasClass('main-page')){
        var mywindow = $(window);
        var mypos = 68;
        var up = false;
        var newscroll;
        var scrollEnd =  $('.page-content').innerHeight() - $('.page-content').offset().top  - $('.company-sidebar').innerHeight();
        console.log(scrollEnd);
        mywindow.scroll(function () {
            newscroll = mywindow.scrollTop();
            if (newscroll > mypos && !up) { //если есть прокрутка в низ·
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
            if(mywindow.scrollTop() >= scrollEnd) {
                $('.company-sidebar').addClass('overflow-height');
            } else{
                $('.company-sidebar').removeClass('overflow-height');
            }
            mypos = newscroll;
        });
    }
    //добавление класса к хедеру при прокруттке страницы на главной
    if($('.main-page').length >0){
        if($(window).scrollTop() >= 0) {
            var height = $(window).scrollTop();

            if (height > 1) {
                $('header').addClass('scroll');
            } else {
                $('header').removeClass('scroll');
            }
        }
        $(window).scroll(function() {

            if($(window).scrollTop() >= 0) {
                var height = $(window).scrollTop();

                if (height > 1) {
                    $('header').addClass('scroll');
                } else {
                    $('header').removeClass('scroll');
                }
            }
        });
    }
}

function Tabs(){
    var $body = $('body'),
        ua = navigator.userAgent,
        event = (ua.match(/iPad/i)) ? "touchstart" : "click";

    //скрипт для карточек , переключение вкладок(анимация)
    if($('.card-content').length > 0){
        //анимация чекбокса
        $body.on(event, '.card-content-tabs--link',function(){
            if (!$(this).hasClass('active')){

                $(this).css('points-events','all');
                $(this).closest('.card-content-tabs').children('.card-content-tabs--link').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.card-content-tabs').find('input').trigger('click');
            }

        });

        // в карточках табы
        $(".card-content").find('.card-content-item').hide();
        $(".card-content").find('.card-content-item:first').show();


        $body.on(event, ".card-content-tabs .card-content-tabs--link", function () {

            $(this).closest('.card-content').find(".card-content-item").hide();

            var activeTab = $(this).attr("rel");

            $("#" + activeTab).fadeIn();

            $(".card-content-tabs .card-content-tabs--link").removeClass("active");
            $(this).addClass("active");

        });
    }



    //tabs в карточеке тендеры
    if($('.tender').length > 0){
        $(".tender").find('.tender-content-tab').hide();
        $(".tender").find('.tender-content-tab:first').show();


        $body.on(event, ".tender-tabs .tender-tabs--name", function () {

            $(".tender-content-tab").hide();

            var activeTab = $(this).attr("rel");

            $("#" + activeTab).fadeIn();

            $(".tender-tabs .tender-tabs--name").removeClass("active");
            $(this).addClass("active");

            // $(".tab-drawer-heading").removeClass("d-active");
            // $(".tab-drawer-heading[rel^='" + activeTab + "']").addClass("d-active");
        });
    }
}


$(document).ready(function () {

    var $body = $('body'),
        ua = navigator.userAgent,
        event = (ua.match(/iPad/i)) ? "touchstart" : "click";

    Scrolling();
    Tabs();

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

//очистка поля поиска
    $body.on(event, '.header-search--btn_reset', function () {
        $(this).fadeOut('fast');
        $(this).closest('form').find('.header-search--btn').css('opacity','.4');
    });

//скрол по якорю
    $body.on(event,".company-sidebar a", function (e) {
        e.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 70;
        $('body,html').animate({scrollTop: top}, 1000);
    });

//показ меню
    $body.on(event, '#show-menu', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#lk-menu').fadeToggle('500');
    });

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
        closeOnBgClick:false,
        removalDelay: 300,
        closeBtnInside: false,
        mainClass: 'zoom-in authorization'
    });

//модалка в модалке "открытия на другом устройстве"
    if(('.use-here').length > 0){
        $body.on(event, '.why-show',function (e) {
            e.preventDefault();
            $(this).closest('.use-here').find('#why-show-modal').show();
        });
        //закрытие этой модалки
        $body.on(event, '.close-why-show-modal', function (e) {
            e.preventDefault();
            $(this).closest('#why-show-modal').hide();
        });
    }

//показ пароля
    $body.on(event, '.show-password', function (e) {
        e.preventDefault();
        var passwordInput = $(this).closest('label').find('input.password'),
            typeInput = passwordInput.attr('type') == "text" ? "password" : 'text';
        passwordInput.prop('type', typeInput);
        $(this).toggleClass('show');
    });

//таймер в модалке регистрации
    if($('.timeout').length > 0){
        var second = $('.timeout').text(),
            int;
        int = setInterval(function () {
            if (second > 0){
                second--;
                $('.timeout').text(second);
            } else{
                clearInterval(int);
                $('.timeout').closest('p').hide();
                $('.return-code').show();
            }
        }, 1000);
    }

//аккордион на главной странице
    if($('.questions').length > 0){
        var accordionContent = $('.questions-list .content').hide();

        $body.on(event, '.questions-list--item .title', function () {
            $this = $(this);
            $target = $this.closest('.questions-list--item').find('.content');

            $this.toggleClass('active');
            $target.slideToggle(500);

        } )
    }


//Показ модалки поделиться
    if($('.company-modal').length > 0){
        $body.on(event, '.trigger-modal', function (e) {
            e.preventDefault();
            $(this).next('.company-modal').fadeIn();
        })
    }
});
$(document).mouseup(function (e){
    var div = $(".company-modal");
    if (!div.is(e.target) && div.has(e.target).length === 0 ) {
        div.fadeOut();
    } else if (div.prev('a').is(e.target)){
        div.show();
    }
});
