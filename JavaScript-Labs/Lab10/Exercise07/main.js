$(function () {
  $("figure img")
    .on("mouseover focus", function (e) {
      $("#preview").remove();
      var alt = $(this).attr("alt"),
        src = $(this).attr("src"),
        newsrc = src.replace("small", "medium");
      var preview = $('<div id="preview"></div>'),
        image = $("<img>", { src: newsrc, alt: alt }),
        caption = $("<p>").text(alt);
      preview.append(image).append(caption);
      $("body").append(preview);
      $(this).addClass("gray");
      movePreview(e);
      $("#preview").fadeIn(1000);
    })
    .on("mouseleave blur", removePreview)
    .on("mousemove", movePreview);
});
function removePreview() {
  $(this).removeClass("gray");
  $("#preview").remove();
}
function movePreview(e) {
  var x = e.pageX || $(e.target).offset().left,
    y = e.pageY || $(e.target).offset().top;
  var left = Math.max(8, Math.min(x + 30, window.innerWidth - 360));
  $("#preview")
    .css("top", y - 10 + "px")
    .css("left", left + "px");
}
