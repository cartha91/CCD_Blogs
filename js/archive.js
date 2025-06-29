document.addEventListener("DOMContentLoaded", () => {
  const archiveContainer = document.getElementById("archive-list");

  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      // Group posts by year
      const grouped = {};
      posts.forEach(post => {
        const year = new Date(post.date).getFullYear();
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(post);
      });

      // Render HTML
      for (const year of Object.keys(grouped).sort((a, b) => b - a)) {
        const yearBlock = document.createElement("div");
        yearBlock.classList.add("archive-year");
        yearBlock.innerHTML = `<h3>${year}</h3><ul></ul>`;

        const list = yearBlock.querySelector("ul");

        grouped[year]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="post.html?id=${post.id}">${post.title}</a> <small>(${post.date})</small>`;
            list.appendChild(li);
          });

        archiveContainer.appendChild(yearBlock);
      }
    })
    .catch(err => {
      archiveContainer.innerHTML = "<p>Error loading archive.</p>";
      console.error(err);
    });
});
