// DOM READY
// CHARACTER COUNT FEATURE
$(document).ready(function() {
  // --- our code goes here ---

  $("#tweet-text").on('input', function() {

    const charactersLeft =  140 - $(this).val().length;
    console.log(charactersLeft);

    const counterT = $("#counterText");
    console.log(counterT.text(charactersLeft));

 
    if (charactersLeft < 0) {
      counterT.css("color", "red");
    }

    if (charactersLeft > 0) {
      counterT.css("color", "black");
    }
   
  });
});


