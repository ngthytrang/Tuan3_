var first = document.getElementById("first"),
  stories = document.getElementById("stories");
var trace = [
  "firstChild nodeType = " + first.firstChild.nodeType,
  "firstChild.nextSibling = " + first.firstChild.nextSibling.nodeName,
  "parentNode = " + first.parentNode.nodeName,
];
for (var i = 0; i < stories.childNodes.length; i++) {
  var child = stories.childNodes[i],
    line = "child " + i + " = " + child.nodeName + " nodeType=" + child.nodeType;
  console.log(line);
  trace.push(line);
  if (child.nodeType !== Node.TEXT_NODE) child.style.backgroundColor = "#e4d78b";
}
var pre = document.createElement("pre");
pre.textContent = trace.join("\n");
document.getElementById("result").appendChild(pre);
