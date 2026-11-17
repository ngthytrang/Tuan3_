// Các cách khai báo cùng một đối tượng, giữ lại để đối chiếu từng bước.
var orderObject = new Object();
orderObject.product = "Self Portrait in a Straw Hat";
orderObject.price = 15;
orderObject.quantity = 2;
orderObject.total = function () {
  return this.price * this.quantity;
};
var bracketOrder = {};
bracketOrder["product"] = orderObject.product;
bracketOrder["price"] = 15;
bracketOrder["quantity"] = 2;
bracketOrder["total"] = orderObject.total;
var literalOrder = {
  product: orderObject.product,
  price: 15,
  quantity: 2,
  total: function () {
    return this.price * this.quantity;
  },
};
function order(product, price, quantity) {
  this.product = product;
  this.price = price;
  this.quantity = quantity;
  this.total = function () {
    return this.price * this.quantity;
  };
  this.output = function () {
    return (
      '<article class="box"><h3>' +
      this.product +
      "</h3><p>Price=$" +
      this.price.toFixed(2) +
      "<br>Quantity=" +
      this.quantity +
      "<br>Total=$" +
      this.total().toFixed(2) +
      "</p></article>"
    );
  };
}
var example1 = new order("Self Portrait in a Straw Hat", 15, 2),
  example2 = new order("Untitled #23", 10, 4);
document.getElementById("result").innerHTML = example1.output() + example2.output();
var p = document.createElement("pre");
p.textContent =
  "order.total (không gọi): " +
  example1.total +
  "\norder.total() = " +
  example1.total() +
  "\nObject / bracket / literal total: " +
  [orderObject.total(), bracketOrder.total(), literalOrder.total()].join(" / ");
document.getElementById("result").appendChild(p);
