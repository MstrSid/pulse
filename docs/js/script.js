
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
      items: 1,
    }
  }
});

document.querySelector('.slider-prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.slider-next').addEventListener('click', function () {
  slider.goTo('next');
});


$(document).ready(function () {
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function tgl(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  }

  tgl('.catalog-item__link');
  tgl('.catalog-item__back');

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
    $(this).find("input").val("");
    $('form').trigger('reset');
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
      $(this).find("input").val("");
      $('form').trigger('reset');
    });
  });



  function validateForms(form) {
    let val = $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true,
          phone: true
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Поле обязательно для заполнения",
          minlength: jQuery.validator.format("Как минимум {0} символа!")
        },
        phone: {
          required: "Поле обязательно для заполнения",
          number: "Ваш телефон не должен содержать запрещенные символы"
        },
        email: {
          required: "Поле обязательно для заполнения",
          email: "Ваш email должен быть в формате имя@домен.зона"
        }
      }
    });
    $('.modal__close').on('click', function () {
      val.resetForm();
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+* (***) ***-**-**");

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  //smooth scroll + page up
  $(window).scroll(function () {  //page up and hide/show icon for this
    if ($(this).scrollTop() > 800) {
      $('.pageup').fadeIn('slow');
    } else {
      $('.pageup').fadeOut('slow');
    }
  });

  $("a[href='#up']").click(function(){
    const _href =$(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});