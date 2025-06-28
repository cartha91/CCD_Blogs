document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");

  fetch("data/posts.json")
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <p><small>${post.category} | ${post.date}</small></p>
          <a href="post.html?id=${post.id}">Read More →</a>
        `;
        postsContainer.appendChild(postCard);
      });
    })
    .catch(error => {
      postsContainer.innerHTML = `<p>Failed to load posts.</p>`;
      console.error("Error loading posts:", error);
    });
});
