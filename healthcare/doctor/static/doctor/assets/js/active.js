(function ($) {
    "use strict";



    /*=============================================
    =            menu sticky and scroll to top            =
    =============================================*/



	/*----------  Menu sticky ----------*/

	var windows = $(window);
	var screenSize = windows.width();
	var sticky = $('.header-sticky');
	var stickyAbsolute = $('.header-sticky--absolute');
	var $html = $('html');
	var $body = $('body');


	windows.on('scroll', function () {
		var scroll = windows.scrollTop();
		var headerHeight = sticky.height();
		var headerHeightAbsolute = stickyAbsolute.height();

		if (screenSize >= 320) {
			if (scroll < headerHeight) {
				sticky.removeClass('is-sticky');
			} else {
				sticky.addClass('is-sticky');
            }

			if (scroll < headerHeightAbsolute) {
				stickyAbsolute.removeClass('is-sticky--absolute');
			} else {
				stickyAbsolute.addClass('is-sticky--absolute');
			}
		}



		//code for scroll top

		if (scroll >= 400) {
			$('.scroll-top').fadeIn();
		} else {
			$('.scroll-top').fadeOut();
		}

	});




	/*----------  Scroll to top  ----------*/

	$('.scroll-top').on('click', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 2000);
	});


    /*=====  End of menu sticky and scroll to top  ======*/



    /*=============================================
    =            dropdown active on click            =
    =============================================*/

    $('#user-options').on('click', function(event){
        event.stopPropagation();
        $(this).siblings().toggleClass('deactive-dropdown-menu active-dropdown-menu');
        $("#language-options").siblings().removeClass('active-dropdown-menu');
        $("#currency-options").siblings().removeClass('active-dropdown-menu');

    });

    $('#language-options').on('click', function(event){
        event.stopPropagation();
        $(this).siblings().toggleClass('deactive-dropdown-menu active-dropdown-menu');
        $("#user-options").siblings().removeClass('active-dropdown-menu');
        $("#currency-options").siblings().removeClass('active-dropdown-menu');

    });

    $('#currency-options').on('click', function(event){
        event.stopPropagation();
        $(this).siblings().toggleClass('deactive-dropdown-menu active-dropdown-menu');
        $("#language-options").siblings().removeClass('active-dropdown-menu');
        $("#user-options").siblings().removeClass('active-dropdown-menu');

    });

    $('#small-cart-trigger').on('click', function(event){
        event.stopPropagation();
        $(this).toggleClass('active');
        $(this).siblings().toggleClass('deactive-dropdown-menu active-dropdown-menu');

    });

    $("body").on("click", function () {
        $(".header-top-single-dropdown__dropdown-menu-items").removeClass('active-dropdown-menu');
        $(".small-cart").removeClass('active-dropdown-menu');
        $(".small-cart-trigger").removeClass('active');
	});



    /*=====  End of dropdown active on click  ======*/



    /*=============================================
    =            Mean menu active            =
    =============================================*/

	var mainMenuNav = $('.main-menu nav');
	mainMenuNav.meanmenu({
		meanScreenWidth: '991',
		meanMenuContainer: '.mobile-menu',
		meanMenuClose: '<span class="mean-menu-text"><i class="lnr lnr-text-align-left"></i> Mobile Menu</span> <span class="menu-close"></span>',
		meanMenuOpen: '<span class="mean-menu-text"><i class="lnr lnr-text-align-left"></i> Mobile Menu</span> <span class="menu-bar"></span>',
		meanRevealPosition: 'right',
		meanMenuCloseSize: '0',
	});

    /*=====  End of Mean menu active  ======*/



    /*=============================================
    =            search overlay active            =
    =============================================*/

    $('#search-overlay-trigger').on('click', function(){
        $('#search-overlay').show();
    });


    $('#close-search-overlay').on('click', function(){
        $('#search-overlay').hide();
    });

    /*=====  End of search overlay active  ======*/



    /*=============================================
    =            slick slider active            =
    =============================================*/

    var $htSlickSlider = $('.ht-slick-slider');

    /*For RTL*/
    if( $html.attr("dir") == "rtl" || $body.attr("dir") == "rtl" ){
        $htSlickSlider.attr("dir", "rtl");
    }

    $htSlickSlider.each(function(){

        /*Setting Variables*/
        var $this = $(this),
            $setting = $this.data('slick-setting'),
            $autoPlay = $setting.autoplay ? $setting.autoplay : false,
            $autoPlaySpeed = parseInt($setting.autoplaySpeed, 10) || 2000,
            $speed = parseInt($setting.speed, 10) || 2000,
            $asNavFor = $setting.asNavFor ? $setting.asNavFor : null,
            $appendArrows = $setting.appendArrows ? $setting.appendArrows : $this,
            $appendDots = $setting.appendDots ? $setting.appendDots : $this,
            $arrows = $setting.arrows ? $setting.arrows : false,
            $prevArrow = $setting.prevArrow ? '<button class="'+ $setting.prevArrow.buttonClass +'"><i class="'+ $setting.prevArrow.iconClass +'"></i></button>' : '<button class="slick-prev">previous</button>',
            $nextArrow = $setting.nextArrow ? '<button class="'+ $setting.nextArrow.buttonClass +'"><i class="'+ $setting.nextArrow.iconClass +'"></i></button>' : '<button class="slick-next">next</button>',
            $centerMode = $setting.centerMode ? $setting.centerMode : false,
            $centerPadding = $setting.centerPadding ? $setting.centerPadding : '50px',
            $dots = $setting.dots ? $setting.dots : false,
            $fade = $setting.fade ? $setting.fade : false,
            $focusOnSelect = $setting.focusOnSelect ? $setting.focusOnSelect : false,
            $infinite = $setting.infinite ? $setting.infinite : false,
            $pauseOnHover = $setting.pauseOnHover ? $setting.pauseOnHover : true,
            $rows = parseInt($setting.rows, 10) || 1,
            $slidesToShow = parseInt($setting.slidesToShow, 10) || 1,
            $slidesToScroll = parseInt($setting.slidesToScroll, 10) || 1,
            $swipe = $setting.swipe ? $setting.swipe : true,
            $swipeToSlide = $setting.swipeToSlide ? $setting.swipeToSlide : false,
            $variableWidth = $setting.variableWidth ? $setting.variableWidth : false,
            $vertical = $setting.vertical ? $setting.vertical : false,
            $verticalSwiping = $setting.verticalSwiping ? $setting.verticalSwiping : false,
            $rtl = $setting.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false;

        /*Responsive Variable, Array & Loops*/
        var $responsiveSetting = typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
            $responsiveSettingLength = $responsiveSetting.length,
            $responsiveArray = [];
            for (var i = 0; i < $responsiveSettingLength; i++) {
				$responsiveArray[i] = $responsiveSetting[i];

			}

        /*Slider Start*/
        $this.slick({
            autoplay: $autoPlay,
			autoplaySpeed: $autoPlaySpeed,
			speed: $speed,
            asNavFor: $asNavFor,
            appendArrows: $appendArrows,
            appendDots: $appendDots,
            arrows: $arrows,
            dots: $dots,
            centerMode: $centerMode,
            centerPadding: $centerPadding,
            fade: $fade,
            focusOnSelect: $focusOnSelect,
            infinite: $infinite,
            pauseOnHover: $pauseOnHover,
            rows: $rows,
            slidesToShow: $slidesToShow,
            slidesToScroll: $slidesToScroll,
            swipe: $swipe,
            swipeToSlide: $swipeToSlide,
            variableWidth: $variableWidth,
            vertical: $vertical,
            verticalSwiping: $verticalSwiping,
            rtl: $rtl,
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
			responsive: $responsiveArray
        });

	});


    /*=====  End of slick slider active  ======*/




    /*=============================================
    =            mailchimp active            =
    =============================================*/

    $('#mc-form, #mc-form2').ajaxChimp({
		language: 'en',
		callback: mailChimpResponse,
		// ADD YOUR MAILCHIMP URL BELOW HERE!
		url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

	});

	function mailChimpResponse(resp) {

		if (resp.result === 'success') {
			$('.mailchimp-success').html('' + resp.msg).fadeIn(900);
			$('.mailchimp-error').fadeOut(400);

		} else if (resp.result === 'error') {
			$('.mailchimp-error').html('' + resp.msg).fadeIn(900);
		}
	}

    /*=====  End of mailchimp active  ======*/



    /*=============================================
    =            countdown active            =
    =============================================*/

    $('[data-countdown]').each(function () {
		var $this = $(this),
		finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">:</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">:</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">:</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text"></span></div>'));
		});
	});

    /*=====  End of countdown active  ======*/



    /*=============================================
    =            quantity counter            =
    =============================================*/

    $('.pro-qty').append('<a onclick="cart_up(this)" href="javascript:void(0)" class="inc qty-btn">+</a>');
	$('.pro-qty').append('<a onclick="cart_up(this)" href="javascript:void(0)" class= "dec qty-btn">-</a>');
	$('.qty-btn').on('click', function (e) {
		e.preventDefault();
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});


    /*=====  End of quantity counter  ======*/



    /*=============================================
    =            newsletter popup area            =
    =============================================*/

    $("#close-newsletter-popup").on("click", function(){
        $("#newsletter-popup-area").addClass("d-none");
    });

    /*=====  End of newsletter popup area  ======*/



    /*=============================================
    =            zoom active            =
    =============================================*/

    $('.big-image-slider99 .big-image-slider-single-item').zoom();
    $('.big-image-slider-wrapper--gallery-mode .big-image-slider-single-item').zoom();
    $('.big-image-slider-wrapper--sticky-mode .big-image-slider-single-item').zoom();
    $('.big-image-slider-wrapper--slider-mode .big-image-slider-single-item').zoom();

    /*=====  End of zoom active  ======*/



    /*=============================================
    =            nice select active            =
    =============================================*/

    $('.nice-select').niceSelect();

    /*=====  End of nice select active  ======*/


    /*=============================================
    =            sticky sidebar            =
    =============================================*/

    $('.single-product-details-sticky').stickySidebar({
		topSpacing: 90,
		bottomSpacing: -180,
		minWidth: 768
	});

    /*=====  End of sticky sidebar  ======*/



    /*=============================================
    =            payment  method select            =
    =============================================*/


    $('[name="payment-method"]').on('click', function () {

        var $value = $(this).attr('value');

        $('.single-method p').slideUp();
        $('[data-method="' + $value + '"]').slideDown();

    });


    /*=====  End of payment  method select  ======*/


    /*=============================================
    =            shipping form toggle            =
    =============================================*/

	$('[data-shipping]').on('click', function () {
		if ($('[data-shipping]:checked').length > 0) {
			$('#shipping-form').slideDown();
		} else {
			$('#shipping-form').slideUp();
		}
	});
    /*=====  End of shipping form toggle  ======*/



    /*=============================================
    =            price range            =
    =============================================*/
(()=>{
    let $min_price = $('#price-amount').siblings('[name="min_price"]');
    let $max_price =  $('#price-amount').siblings('[name="max_price"]');
	$('#price-range').slider({
		range: true,
		min: 0,
		max: 20000,
		values: [ parseInt($min_price.val() || 0), parseInt($max_price.val() || 0) ],
		slide: function( event, ui ) {
            $('#price-amount').val( 'Rs.' + ui.values[ 0 ] + ' - Rs.' + ui.values[ 1 ] );
            $min_price.val(ui.values[ 0 ]);
            $max_price.val(ui.values[ 1 ]);
		}
	});
	$('#price-amount').val('Rs.' + $('#price-range').slider( 'values', 0 ) +
		' - Rs.' + $('#price-range').slider('values', 1 ) );
})();
    /*=====  End of price range  ======*/


    /*=============================================
    =            product view mode            =
    =============================================*/

	$('.grid-icons button').on('click', function (e) {
		e.preventDefault();

		var shopProductWrap = $('.shop-product-wrap');
		var viewMode = $(this).data('target');

		$('.grid-icons button').removeClass('active');
		$(this).addClass('active');
        shopProductWrap.removeClass('grid three-column four-column list').addClass(viewMode);

        if(viewMode == 'grid three-column'){
			shopProductWrap.children().addClass('col-lg-4').removeClass('col-lg-3');
		}

		if(viewMode == 'grid four-column'){
			shopProductWrap.children().addClass('col-lg-3').removeClass('col-lg-4');
		}
	});
    /*=====  End of product view mode  ======*/


    /*----------  product view mode  ----------*/

    /*----------  blog image gallery slider  ----------*/

		var blogPostSlider = $('.blog-image-gallery');
		blogPostSlider.slick({
			prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
			arrows: true,
			autoplay: true,
			autoplaySpeed: 4000,
			dots: false,
			pauseOnFocus: false,
			pauseOnHover: false,
			infinite: true,
			slidesToShow: 1
		});




})(jQuery);