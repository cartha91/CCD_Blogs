document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  const buttons = document.querySelectorAll(".filter-btn");
  let allPosts = [];

  // Fetch posts from JSON
  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      allPosts = posts;
      displayPosts("All");
    })
    .catch(err => {
      postsContainer.innerHTML = "<p>Error loading posts.</p>";
      console.error("Failed to load posts:", err);
    });

  // Function to display posts based on selected category
  function displayPosts(category) {
    postsContainer.innerHTML = "";
    const filtered = category === "All"
      ? allPosts
      : allPosts.filter(post => post.category === category);

    if (filtered.length === 0) {
      postsContainer.innerHTML = `<p>No posts in ${category} yet.</p>`;
      return;
    }

    filtered.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <p><small>${post.category} | ${post.date}</small></p>
        <a href="post.html?id=${post.id}">Read More →</a>
      `;
      postsContainer.appendChild(card);
    });
  }

  // Add click event listeners to all filter buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      // Update active class for button animations
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Load relevant posts
      displayPosts(category);
    });
  });
});
