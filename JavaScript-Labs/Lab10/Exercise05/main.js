$(function () {
  function insert() {
    var method = $("#method").val();
    $("#insertion img").remove();
    var img = $("<img>", {
      src: "../../assets/images/art/thumbs/13030.jpg",
      alt: "Artwork 13030",
      width: 100,
    });
    var panel = $(".panel");
    if (["after", "before", "append", "prepend"].indexOf(method) >= 0) panel[method](img);
    else img[method](panel);
    $("#message").text(
      "Đã chèn bằng " +
        method +
        "; ảnh đang " +
        (img.parent().is(panel) ? "bên trong" : "bên ngoài") +
        " panel.",
    );
  }
  $("#method").on("change", insert);
  $("#method").val("insertBefore");
  insert();
});
