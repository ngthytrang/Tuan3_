function outputList(title, items) {
  return (
    '<section class="card"><h2>' +
    title +
    "</h2><ul>" +
    items
      .map(function (item) {
        return "<li>" + item + "</li>";
      })
      .join("") +
    "</ul></section>"
  );
}
function outputPost(post) {
  return (
    '<article class="card"><img width="200" src="images/travel/' +
    post.thumb +
    '" alt="' +
    post.title +
    '"><h2>' +
    post.title +
    "</h2><p>" +
    post.user +
    " · " +
    post.postdate +
    "</p><p>" +
    post.excerpt +
    "</p></article>"
  );
}
document.getElementById("travel").innerHTML =
  '<div class="grid">' +
  outputList("Continents", continents) +
  outputList("Popular countries", countries) +
  '</div><h2>Posts</h2><div class="grid">' +
  posts.map(outputPost).join("") +
  "</div>";
