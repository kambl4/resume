'use strict';

//Anchors
$(() => {
  $('a[href^="#"]').click(function() {
    let target = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(target).offset().top - 50 }, 800);
    return false;
  });
});

//Fixed-top menu
let fixedHeader = () => {
  let ww = $(window).scrollTop();
  if (ww > 0) {
    $('.menu').addClass('menu--active');
    $('.mobile-menu').addClass('mobile-menu--active');
  } else {
    $('.menu').removeClass('menu--active');
    $('.mobile-menu').removeClass('mobile-menu--active');
  }
};

fixedHeader();
$(window).on('scroll', () => {
  fixedHeader();
});


