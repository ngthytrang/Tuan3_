$(function () {
  function finalSelectors() {
    $("input").css("background-color", "white");
    $("form :nth-child(4n)").css("background-color", "yellow");
    $('label:contains("word")').css("color", "black");
  }
  finalSelectors();
  $("#password-selector").on("click", function () {
    $("input").css("background-color", "white");
    $(":password").css("background-color", "yellow");
  });
  $("#final-selector").on("click", finalSelectors);
  $("#sampleForm").on("submit", function (e) {
    e.preventDefault();
  });
});
