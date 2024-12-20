
(function ($, window, document, undefined) {
    'use strict';
    var $winW = function () {
        return $(window).width();
    };
    var $winH = function () {
        return $(window).height();
    };
    var $screensize = function (element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function (mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $(document).ready(function () {
        $(window).on('load', function () {
            $('.preloader').fadeOut();
            $('.animated-row').each(function () {
                var $this = $(this);
                $this.find('.animate').each(function (i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function (event, isInView) {
                        if (isInView) {
                            setTimeout(function () {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
        });
        if ($('.gallery-list').length) {
            $('.gallery-list').owlCarousel({
                loop: false,
                nav: false,
                dots: true,
                items: 3,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.fullpage-default').length) {
            var myFullpage = new fullpage('.fullpage-default', {
                licenseKey: ' C7F41B00-5E824594-9A5EFB99-B556A3D5',
                anchors: ['slide01', 'slide02', 'slide03', 'slide04', 'slide05'],
                menu: '#nav',
                lazyLoad: true,
                navigation: true,
                navigationPosition: 'right',
                scrollOverflow: true,
                responsiveWidth: 768,
                responsiveHeight: 600,
                responsiveSlides: true
            });
        }
        $(document).on('click', '.navbar-toggle', function () {
            $('.navbar-collapse').slideToggle(300);
            return false;
        }).on('click', '.navigation-menu > li > a', function () {
            $('.navbar-collapse').slideUp(300);
        }).on('click', '.next-section', function () {
            fullpage_api.moveSectionDown();
        });
        $(document).on('click', '.menu-trigger', function () {
            $('body').toggleClass('sidemenu-open');
        }).on('click', '.side-menu .navbar-nav li a', function () {
            $('body').removeClass('sidemenu-open');
        });
    });
})(jQuery, window, document);