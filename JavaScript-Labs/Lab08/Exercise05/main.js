// Giữ bản cuối đã sửa document; lỗi cố ý được cô lập để trang vẫn chạy.
var temp = count * 7;
console.log("script within the <head> element");
console.log({ count, output, temp });
console.warn("oh no this is a warning");
console.error("panic!! error!! (thông báo minh họa theo Exercise 8.5)");
document.getElementById("result").textContent =
  "count = " + count + "; output = " + output + "; temp = " + temp;
document.getElementById("bug").onclick = function () {
  try {
    doccumment.write("this text was written from JS");
  } catch (error) {
    document.getElementById("result").textContent =
      error.name + ": " + error.message + " → sửa thành document.write";
    console.log(error);
  }
};
