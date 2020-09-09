$(document).ready(function() { 
   $('#formulating-thought').keyup(function() {
    let remainingCharacters = 140 - $(this).val().length;
    console.log(remainingCharacters);
    $('.counter').val(remainingCharacters);
    if (remainingCharacters < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  })
});
