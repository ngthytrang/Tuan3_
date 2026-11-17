$(function () {
  $("#result").text("jQuery version: " + $.fn.jquery + " — thư viện cục bộ đã tải.");
  $("#cdn").on("click", function () {
    var localVersion = window.jQuery;
    $("#result").text("Đang thử CDN…");
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.1.1.min.js";
    var timer = setTimeout(fallback, 4000);
    function fallback() {
      clearTimeout(timer);
      window.jQuery = window.$ = localVersion;
      document.getElementById("result").textContent =
        "CDN không phản hồi: sử dụng fallback cục bộ jQuery " + localVersion.fn.jquery;
    }
    script.onload = function () {
      clearTimeout(timer);
      document.getElementById("result").textContent = "CDN đã tải: jQuery " + jQuery.fn.jquery;
    };
    script.onerror = fallback;
    document.head.appendChild(script);
  });
});
