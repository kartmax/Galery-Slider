import $ from "jquery";
import wowjs from "wowjs";


//TABS WITHOUT WOW
// $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
//     $(this)
//         .addClass('active').siblings().removeClass('active')
//         .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
// });


//TABS WITH WOW
$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
$('.wow').removeClass('wow')
$(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active')
      .addClass('wow')
      new wowjs.WOW({live: false}).init()
  });
  $('.tabs__content')
      .addClass('wow fadeIn')
      .attr('data-wow-duration', '1s')
      .attr('data-wow-offset', '100')