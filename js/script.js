
const slider = tns({
  container: '.slider__inner',
  items: 1,
  slideBy: 'page',
  nav: false,
  controls: false,
  responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 1
      },
      700: {
        gutter: 30
      },
      900: {
        items: 1
      }
    }
});

document.querySelector('.slider-prev').addEventListener('click',function () {
  slider.goTo('prev');
});

document.querySelector('.slider-next').addEventListener('click',function () {
  slider.goTo('next');
});


$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function tgl(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      }) 
    });
  }

  tgl('.catalog-item__link');
  tgl('.catalog-item__back');

});