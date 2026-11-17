$(function () {
  $(".animLoading").prop("hidden", false).hide();
  $("#consume").on("click", function () {
    var source = $("#source").val();
    var url =
      source === "remote"
        ? "https://www.randyconnolly.com/funwebdev/services/travel/cities.php"
        : source === "error"
          ? "../../data/not-found.json"
          : "../../data/cities.json";
    var button = $(this);
    button.prop("disabled", true);
    $("#results ul").empty();
    $(".animLoading").stop(true, true).show();
    $("#request-status").text("GET " + url);
    $.get({ url: url, dataType: "json", timeout: 8000 })
      .done(function (data) {
        $.each(data, function (index, value) {
          $("<li/>").text(value.name).appendTo("div#results ul");
        });
        $("#request-status").text("done: " + data.length + " thành phố · " + source);
      })
      .fail(function (xhr, status, error) {
        $("#request-status").text(
          "fail: status=" + status + "; HTTP " + xhr.status + "; error=" + error,
        );
      })
      .always(function () {
        $(".animLoading").fadeOut("slow");
        button.prop("disabled", false);
        console.log("always: kết thúc request, thu dọn loading");
      });
  });
});
