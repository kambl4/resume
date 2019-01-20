'use strict';

//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', () => {
  $('.mobile-menu').toggleClass('active');
});

//Close mobile menu after click
$('.mobile-menu__wrapper ul li a').on('click', () => {
  $('.mobile-menu').removeClass('active');
});