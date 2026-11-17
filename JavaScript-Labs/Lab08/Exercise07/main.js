var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");
var calendar = '<table aria-label="Lịch 30 ngày bắt đầu Chủ nhật"><thead><tr>';
for (var i = 0; i < daysOfWeek.length; i++) {
  var day = daysOfWeek[i].length < 4 ? daysOfWeek[i] : "<em>" + daysOfWeek[i] + "</em>";
  calendar += "<th>" + day + "</th>";
}
calendar += "</tr></thead><tbody>";
for (var row = 0; row < 5; row++) {
  calendar += "<tr>";
  for (var col = 0; col < 7; col++) {
    var date = row * 7 + col + 1;
    calendar += "<td>" + (date <= 30 ? date : "") + "</td>";
  }
  calendar += "</tr>";
}
calendar += "</tbody></table>";
document.getElementById("result").innerHTML = calendar;
