var btn = document.getElementById("testButton"),
  content = document.getElementById("content"),
  timer;
function simpleHandler(event) {
  clearTimeout(timer);
  if (btn.innerHTML === "Hide") {
    btn.innerHTML = "Show";
    content.className = "makeItDisappear";
    timer = setTimeout(function () {
      content.style.display = "none";
    }, 1000);
  } else {
    btn.innerHTML = "Hide";
    content.style.display = "block";
    timer = setTimeout(function () {
      content.className = "makeItNormal";
    }, 500);
  }
}
btn.addEventListener("click", simpleHandler);
var img = document.getElementById("mainImage");
img.addEventListener("mouseover", function () {
  img.className = "makeItGray";
});
img.addEventListener("mouseout", function () {
  img.className = "makeItNormal";
});
