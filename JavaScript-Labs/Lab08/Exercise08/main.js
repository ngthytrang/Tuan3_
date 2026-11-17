var boxClass = "movingDiv"; // biến có phạm vi toàn cục theo bài lab
function outputBox(num) {
  var box = "<div class='" + boxClass + "' id='div" + num + "'>This is div " + num + "</div>";
  return box;
}
for (var count = 1; count < 6; count++) {
  document.getElementById("result").insertAdjacentHTML("beforeend", outputBox(count));
}
try {
  console.log(box);
} catch (error) {
  console.log("box có phạm vi cục bộ:", error.message);
  document
    .getElementById("result")
    .insertAdjacentHTML(
      "beforeend",
      "<p>box có phạm vi cục bộ → " +
        error.name +
        ". Biến luôn được khai báo để tránh tạo global ngoài ý muốn.</p>",
    );
}
