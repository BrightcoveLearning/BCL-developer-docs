$(document).ready(function () {
  $('.new-block').hide();
  $('.parent0').on('click', function () {
    $(this).next('.new-block').toggle(200);
  });
  $('.parent1').on('click', function () {
    $(this).next('.new-block').toggle(200);
  });
  $('.parent2').on('click', function () {
    $(this).next('.new-block').toggle(200);
  });
  $('.parent3').on('click', function () {
    $(this).next('.new-block').toggle(200);
  });
  $('.parent4').on('click', function () {
    $(this).next('.new-block').toggle(200);
  });
});
