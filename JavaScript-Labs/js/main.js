fetch("profile.json")
  .then((r) => r.json())
  .then((p) => {
    document
      .querySelectorAll("[data-profile]")
      .forEach((e) => (e.textContent = p[e.dataset.profile]));
    if (/^https:\/\/github\.com\//.test(p.github)) {
      let a = document.createElement("a");
      a.href = p.github;
      a.textContent = "GitHub cá nhân ↗";
      document.getElementById("github-profile").replaceChildren(a);
    }
  })
  .catch(() => {});
