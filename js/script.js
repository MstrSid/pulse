  const slider = tns({
    container: '.slider__inner',
    items: 1,
    slideBy: 'page',
    nav: false,
    controls: false
  });

  document.querySelector('.slider-prev').addEventListener('click',function () {
    slider.goTo('prev');
  });

  document.querySelector('.slider-next').addEventListener('click',function () {
    slider.goTo('next');
  });
