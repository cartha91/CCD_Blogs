document.addEventListener("DOMContentLoaded", () => {
  const postId = new URLSearchParams(window.location.search).get("id");
  const form = document.getElementById("comment-form");
  const input = document.getElementById("comment-input");
  const list = document.getElementById("comment-list");

  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    list.innerHTML = "";
    comments.forEach(comment => {
      const el = document.createElement("div");
      el.className = "comment";
      el.innerHTML = `<p>${comment}</p>`;
      list.appendChild(el);
    });
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const newComment = input.value.trim();
    if (!newComment) return;

    const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    comments.push(newComment);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));
    input.value = "";
    loadComments();
  });

  loadComments();
});
