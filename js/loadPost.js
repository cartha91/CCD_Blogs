document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get("id"), 10);

  if (!postId) {
    document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
    return;
  }

  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.id === postId);
      if (!post) {
        document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
        return;
      }

      const postHTML = `
  <article class="post-full">
    ${post.heroImage ? `<img src="${post.heroImage}" alt="${post.title}" class="post-hero" />` : ""}
    <h2>${post.title}</h2>

          <p><small>${post.date} • ${post.category}</small></p>
          <div class="post-body">
            <p>${post.content}</p>
          </div>
          <div class="post-tags">
            <strong>Tags:</strong> ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}
          </div>
        </article>
      `;

      document.getElementById("post-content").innerHTML = postHTML;
    })
    .catch(err => {
      document.getElementById("post-content").innerHTML = "<p>Error loading post.</p>";
      console.error("Error:", err);
    });
});
