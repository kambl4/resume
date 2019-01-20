'use strict';

//Filter project cards
let previousClickedMenuLink = undefined;
$('.portfolio-menu').on('click', 'a', event => {
  event.preventDefault();

  if (previousClickedMenuLink) {
    previousClickedMenuLink.removeClass('portfolio-menu__link--active');
  }
  let link = $(event.target);
  link.addClass('portfolio-menu__link--active');
  previousClickedMenuLink = link;

  let targetTag = $(event.target).data('portfolio-target-tag');
  let portfolioItems = $('.portfolio-cards').children();

  if (targetTag === 'all') portfolioItems.fadeIn({duration: 500});
  else portfolioItems.hide();

  portfolioItems.each((index, value) => {
    let item = $(value);
    if (item.data('portfolio-tag') === targetTag) item.fadeIn({duration: 500});
  });
});