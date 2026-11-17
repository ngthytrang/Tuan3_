function Country(name, iso, capital, population) {
  this.name = name;
  this.iso = iso;
  this.capital = capital;
  this.population = population;
}
var countries = [
  new Country("Bahamas", "BS", "Nassau", 301790),
  new Country("Canada", "CA", "Ottawa", 33679000),
  new Country("Germany", "DE", "Berlin", 81802257),
];
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));
for (var i = 0; i < countries.length; i++) {
  var c = countries[i],
    temp = "name";
  console.log(c.name, c["name"], c[temp]);
  var card = document.createElement("article");
  card.className = "box";
  var img = document.createElement("img");
  img.src = "../../assets/flags/" + c.iso + ".png";
  img.alt = c.name + " flag";
  card.appendChild(img);
  for (var propertyName in c) {
    var p = document.createElement("p");
    var strong = document.createElement("strong");
    strong.textContent = propertyName + ": ";
    p.append(strong, document.createTextNode(c[propertyName]));
    card.appendChild(p);
  }
  document.getElementById("result").appendChild(card);
}
