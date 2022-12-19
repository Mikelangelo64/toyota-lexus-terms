$(document).ready(function () {
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  if (isMobile.any()) {
    $('body').addClass('_touch');
  } else {
    $('body').addClass('_pc');
  }

  //wow
  wowAnimation = new WOW({
    boxClass: 'animate-up',
    animateClass: 'show',
    offset: 200,
  });

  wowAnimation.init();

  //right vh
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.body.style.setProperty('--vh', `${vh}px`);

  //scroll more
  const moreButton = document.body.querySelector('.banner__more');

  if (moreButton) {
    moreButton.addEventListener('click', (e) => {
      e.preventDefault();
      const element = document.body.querySelector('.banner');
      if (!element) {
        return;
      }
      const top = element.nextElementSibling.offsetTop;
      console.log(top);

      window.scrollTo({
        top: top - 20,
        behavior: 'smooth',
      });
    });
  }

  //parallax banner/request
  const banners = document.body.querySelectorAll('.banner-back__item');
  const shadows = document.body.querySelectorAll('.banner-back__shadow');

  function setParallax(element, isReverse, additionalElements) {
    if (!element || !additionalElements) {
      return null;
    }

    let top = element.getBoundingClientRect().top;

    const height = element.getBoundingClientRect().height;
    let progress = Math.min(Math.max(-top / height, 0), 1);

    if (isReverse) {
      progress *= -1;
    }

    if (document.body.clientWidth <= 1440) {
      if (isReverse) {
        additionalElements[0].style.transform = `translateX(${
          -progress * 100 - 100
        }%)`;
      } else {
        additionalElements[1].style.transform = `translateX(${
          100 - progress * 100
        }%)`;
      }
    }

    element.style.backgroundPosition = `${progress * 10}px 0`;
  }

  function listenerHandler() {
    banners.forEach((banner, index) => {
      setParallax(banner, index !== 0, shadows);
    });
  }

  let isHasScroll = true;

  window.addEventListener('scroll', listenerHandler);
  window.addEventListener('resize', () => {
    if (document.body.clientWidth <= 1210) {
      window.removeEventListener('scroll', listenerHandler);
      banners.forEach((banner, index) => {
        banner.style.backgroundPosition = '';
      });
      shadows.forEach((shadow, index) => {
        shadow.style.transform = '';
      });
      isHasScroll = false;
    }

    if (document.body.clientWidth > 1210 && !isHasScroll) {
      window.addEventListener('scroll', listenerHandler);
      isHasScroll = true;
    }

    shadows.forEach((shadow) => {
      if (document.body.clientWidth > 1440) {
        // shadow.style.transform = 'ranslateX(35%)';
      } else {
        shadow.style.transform = '';
      }
    });
  });

  //swipers
  let swiperDonats = null;

  $('.donat-slider.swiper').each(function (index) {
    swiperDonats = new Swiper(`._donat-${index}.donat-slider.swiper`, {
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: `._donat-${index}.donat-slider .donat-slider__pagination__container`,
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 24,
    });
  });

  //swiper sponsors
  let swiperSponsors = new Swiper('.sponsors-slider.swiper', {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.sponsors__slider__navigation__container .swiper-button-next',
      prevEl: '.sponsors__slider__navigation__container .swiper-button-prev',
    },
    slidesPerView: 2,
    spaceBetween: 10,

    breakpoints: {
      899: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 33,
      },
    },
  });

  //swiper awards
  let swiperAwards = new Swiper('.awards-slider.swiper', {
    slidesPerView: 2,
    spaceBetween: 10,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    breakpoints: {
      899: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1199: {
        slidesPerView: 3,
        spaceBetween: 106,
      },
    },
  });
});
