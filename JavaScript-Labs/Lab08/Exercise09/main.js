var isCanadian = true;
// Bước trung gian: hàm lồng và biểu thức hàm có tên.
function nestedTax(amount) {
  function taxRate() {
    return isCanadian ? 0.05 : 0;
  }
  return amount * taxRate();
}
function namedTax(amount) {
  var tax = function taxRate() {
    return isCanadian ? 0.05 : 0;
  };
  return amount * tax();
}
// Bản cuối: truyền hàm ẩn danh làm tham số.
function calculateTax(amount, tax) {
  return amount * tax();
}
function calculateTotal(price, quantity) {
  var amount = price * quantity;
  return (
    amount +
    calculateTax(amount, function () {
      return isCanadian ? 0.05 : 0;
    })
  );
}
function render() {
  var amount = calculateTotal(15, 2);
  document.getElementById("result").innerHTML =
    "<h2>Total: $" +
    amount.toFixed(2) +
    "</h2><p>Hàm lồng / hàm có tên: $" +
    nestedTax(30).toFixed(2) +
    " / $" +
    namedTax(30).toFixed(2) +
    " tiền thuế.</p>";
}
document.getElementById("canadian").onchange = function () {
  isCanadian = this.value === "yes";
  render();
};
render();
