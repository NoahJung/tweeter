$(document).ready(function() {

  $("#tweet-text").on("keydown", function(event){

    const currentText = 140 - $(this).val().length;

    $(this).next().children("output").text(currentText);

    if (currentText < 0) {
      $(this).next().children("output").addClass("on");
    } else {
      $(this).next().children("output").removeClass("on");
    }

    });

  
});