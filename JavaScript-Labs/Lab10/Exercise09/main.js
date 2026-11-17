$(function () {
  $("#consume").on("click", function () {
    var source = $("#source").val();
    var url =
      source === "remote"
        ? "https://www.randyconnolly.com/funwebdev/services/travel/cities.php"
        : source === "error"
          ? "../../data/not-found.json"
          : "../../data/cities.json";
    $("#results ul").empty();
    $("#request-status").text("GET " + url);
    $.get(
      url,
      function (data, status) {
        if (status === "success") {
          if (typeof data === "string") data = JSON.parse(data);
          $.each(data, function (index, value) {
            $("<li/>").text(value.name).appendTo("div#results ul");
          });
          $("#request-status").text("success · " + data.length + " thành phố · " + source);
        }
      },
      "json",
    ).fail(function (xhr, status) {
      $("#request-status").text(
        "Yêu cầu thất bại: " +
          status +
          " (HTTP " +
          xhr.status +
          "). Thử JSON cục bộ nếu dịch vụ bị chặn CORS.",
      );
    });
  });
});
