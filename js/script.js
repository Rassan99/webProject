const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message);
      contactForm.reset();
    } catch (err) {
      alert("فشل إرسال النموذج");
    }
  });
}

const commentForm = document.querySelector("#comment-form");
if (commentForm) {
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const msg = await res.json();
      alert(msg.message);
      commentForm.reset();
      fetchComments();
    } catch (err) {
      alert("تعذر إرسال التعليق");
    }
  });
}

async function fetchComments() {
  const container = document.getElementById("comment-ribbon");
  if (!container) return;

  try {
    const res = await fetch("/api/comments");
    const comments = await res.json();

    if (comments.length === 0) {
      container.innerHTML =
        "<div class='comment-box'><p>لا توجد تعليقات</p></div>";
      return;
    }

    const repeated = [...comments, ...comments, ...comments];

    container.innerHTML = repeated
      .map(
        (comment) => `
          <div class="comment-box">
            <h4>${comment.name}</h4>
            <p>${comment.comment}</p>
          </div>
        `
      )
      .join("");
  } catch (err) {
    container.innerHTML =
      "<div class='comment-box'><p>فشل تحميل التعليقات</p></div>";
  }
}

fetchComments();
