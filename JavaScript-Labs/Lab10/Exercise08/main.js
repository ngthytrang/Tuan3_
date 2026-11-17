$(function () {
  $("#animate").on("click", function () {
    $("#message").text("Đang chạy 3 bước…");
    var left = Math.min(495, $("#stage").width() - 100);
    $("#box")
      .stop(true, false)
      .animate({ left: left + "px", opacity: 1, height: "50px" })
      .animate({ top: "400px", opacity: 0.2 })
      .animate({ height: "200px" }, 2000, function () {
        $("#message").text("Hoàn tất: left=" + left + ", top=400, height=200, opacity=0.2");
      });
  });
  $("#reset").on("click", function () {
    $("#box").stop(true, false).css({ left: 0, top: 0, height: 100, opacity: 0.5 });
    $("#message").text("Đã đặt lại");
  });
});
