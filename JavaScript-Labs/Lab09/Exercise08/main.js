function init() {
  document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}
window.addEventListener("load", init);
function checkForEmptyFields(e) {
  e.preventDefault(); // Bản demo không gửi mật khẩu qua URL hay tới máy chủ.
  var errorArea = document.getElementById("errors");
  errorArea.className = "hidden";
  errorArea.textContent = "";
  document.getElementById("success").textContent = "";
  var fields = document.querySelectorAll("input[type=text],input[type=password]"),
    fieldList = [];
  for (var i = 0; i < fields.length; i++) {
    var empty = fields[i].value.trim() === "";
    fields[i].setAttribute("aria-invalid", String(empty));
    if (empty) fieldList.push(fields[i]);
  }
  if (fieldList.length > 0) {
    errorArea.textContent =
      "The following fields can't be empty: " +
      fieldList
        .map(function (field) {
          return field.id;
        })
        .join(", ");
    errorArea.className = "visible error";
    fieldList[0].focus();
  } else {
    document.getElementById("success").className = "success";
    document.getElementById("success").textContent =
      "Dữ liệu hợp lệ: tất cả trường đã được điền. Đây là kiểm tra phía trình duyệt, chưa tạo tài khoản.";
  }
}
