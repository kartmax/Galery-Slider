import Swiper from 'swiper/bundle';

const swiperMain = new Swiper('.js-slider_main', {
   freeMode: true,
   centeredSlides: true,
   mousewheel: true,
   parallax: true,

   breakpoints: {
      0: {
         slidesPerView: 1.5,
         spaceBetween: 20
      },
      480: {
         slidesPerView: 2.5,
         spaceBetween: 30
      },
      992: {
         slidesPerView: 3.5,
         spaceBetween: 30
      },
      1200: {
         slidesPerView: 3.5,
         spaceBetween: 60
      }
   }
});

const swiperBg = new Swiper('.js-slider_bg', {
   centeredSlides: true,
   parallax: true,
   slidesPerView: 3.5,
   spaceBetween: 60
});

swiperMain.controller.control = swiperBg;

function toggleClassOpened () {
   document.addEventListener('click', (e) => {
      if( e.target.classList.contains('slider__img') ) {
         let parentSliderItem = e.target.closest('.slider__item');
         if( parentSliderItem ) {
            document.querySelectorAll('.opened').forEach(item => {
               if(item !== parentSliderItem) {
                  item.classList.remove('opened');
               }
            });
            parentSliderItem.classList.toggle('opened')
         }
      }
   })
};

toggleClassOpened();

const description = document.querySelector('.description');

swiperMain.on('slideChange', function () {
   swiperMain.activeIndex > 0 ? description.classList.add('hidden') : description.classList.remove('hidden');
 });