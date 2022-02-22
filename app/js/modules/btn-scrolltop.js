import $ from "jquery";

$(".scrolltop").hide();
// fade in #back-top
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('.scrolltop').fadeIn();
    } else {
        $('.scrolltop').fadeOut();
    }
});

// scroll body to 0px on click
$('.scrolltop').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});