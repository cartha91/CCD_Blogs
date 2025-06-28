document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-bar");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll(".post-card");

    posts.forEach(post => {
      const text = post.textContent.toLowerCase();
      post.style.display = text.includes(query) ? "block" : "none";
    });
  });
});
