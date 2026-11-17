window.addEventListener("load", function () {
  var divs = document.querySelectorAll(".movingDiv");
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener("mouseover", inspectEvent);
    divs[i].addEventListener("focus", inspectEvent);
  }
});
function inspectEvent(e) {
  var targetId = e.target.id;
  // Đặt breakpoint tại dòng sau; quan sát local targetId, e và e.target.
  console.log("triggered by " + targetId, e);
  document.getElementById("debug-output").textContent =
    "triggered by " +
    targetId +
    "\ne.type = " +
    e.type +
    "\ne.target.id = " +
    e.target.id +
    "\npageX = " +
    e.pageX +
    "; pageY = " +
    e.pageY;
}
