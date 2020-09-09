$(document).ready(function() {
  
  $('formulating-thought').keyup(function() {
    const maximumCharacters = 140;
    let remainingCharacters = maximumCharacters - $(this).val().length;
    if (remainingCharacters >= 0) {
      $(".new-tweet .counter").css('color', 'black');
    } else {
      $(".new-tweet .counter").css('color', 'red');
    }
  })
});
