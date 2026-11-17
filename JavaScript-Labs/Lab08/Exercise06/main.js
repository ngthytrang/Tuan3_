var stringOne = new String("Test"),
  stringTwo = "Test",
  stringThree = "Test",
  stringFour = new String("Test");
var dateOne = new Date();
document.getElementById("result").innerHTML =
  "<h2>String, Date & Math</h2><pre>" +
  [
    "typeof stringOne = " + typeof stringOne,
    "typeof stringThree = " + typeof stringThree,
    "stringOne == stringTwo: " + (stringOne == stringTwo),
    "stringOne == stringFour: " + (stringOne == stringFour),
    "stringOne === stringTwo: " + (stringOne === stringTwo),
    "stringTwo === stringThree: " + (stringTwo === stringThree),
    "stringTwo === stringFour: " + (stringTwo === stringFour),
    "Date: " + dateOne,
    "Math.PI = " + Math.PI,
    "Math.sqrt(4) = " + Math.sqrt(4),
    "Math.random() = " + Math.random(),
  ].join("\n") +
  "</pre>";
