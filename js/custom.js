// configuração dos vendors
bootbox.setDefaults({locale: "br", animate: false});

$(document).ready(function () {
    $(".has_submenu > a").click(function (e) {
        e.preventDefault();
        var menu_li = $(this).parent("li");
        var menu_ul = $(this).next("ul");
        if (menu_li.hasClass("open")) {
            menu_ul.slideUp(350);
            menu_li.removeClass("open")
        }
        else {
            $(".nav > li > ul").slideUp(350);
            $(".nav > li").removeClass("open");
            menu_ul.slideDown(350);
            menu_li.addClass("open");
        }
    });
    $('body').on('click', '.dropdown-toggle', function (e) {
        e.preventDefault();
    });
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });
    $('body').popover({
        animation: false,
        html: true,
        trigger: 'hover',
        placement: 'auto top',
        selector: '[rel=popover]',
        content: function () {
            return $($(this).data('conteudo')).html();
        }
    });

});

$(document).ready(function(){
    $(".sidebar-dropdown a").on('click',function(e){
        e.preventDefault();

        if(!$(this).hasClass("dropy")) {
            // hide any open menus and remove all other classes
            $(".sidey").slideUp(350);
            $(".sidebar-dropdown a").removeClass("dropy");

            // open our new menu and add the dropy class
            $(".sidey").slideDown(350);
            $(this).addClass("dropy");
        }

        else if($(this).hasClass("dropy")) {
            $(this).removeClass("dropy");
            $(".sidey").slideUp(350);
        }
    });

});

/* Scroll to Top starts */

$(".totop").hide();

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.totop').slideDown();
        }
        else {
            $('.totop').slideUp();
        }
    });

    $('.totop a').click(function (e) {
        e.preventDefault();
        $('body,html').animate({scrollTop: 0}, 500);
    });

});

/* Scroll to top ends */
