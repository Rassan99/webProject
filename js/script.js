function validateCommentForm(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) {
    errors.push("الاسم يجب أن يحتوي على حرفين على الأقل.");
  }
  if (!data.comment || data.comment.trim().length < 5) {
    errors.push("التعليق يجب أن يكون أطول.");
  }
  return errors;
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    // Convert form data to a plain object
    const data = Object.fromEntries(formData);

    // Debugging: Log the form data object to check what was actually collected
    console.log("Form Data Object:", data);

    // Perform client-side validation
    const errors = validateContactForm(data);
    if (errors.length > 0) {
      alert(errors.join("\n")); // Show errors in alert if validation fails
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      // Display the thank you message with the user's name
      alert(
        `شكراً، ${result.firstName} ${result.lastName}! تم إرسال النموذج بنجاح.`
      );

      contactForm.reset();
    } catch (err) {
      alert("فشل إرسال النموذج");
    }
  });
}

// Client-side validation function
function validateContactForm(data) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Debugging: Log the data being passed to the validation
  console.log("Validating Data:", data);

  // Validate first name
  if (!data.firstName || data.firstName.trim() === "") {
    errors.push("الاسم الأول مطلوب.");
  }

  // Validate last name
  if (!data.lastName || data.lastName.trim() === "") {
    errors.push("الاسم الأخير مطلوب.");
  }

  // Validate email
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("البريد الإلكتروني غير صالح.");
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push("الرسالة يجب أن تكون على الأقل 10 أحرف.");
  }

  return errors;
}

const commentForm = document.querySelector("#comment-form");
if (commentForm) {
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const data = Object.fromEntries(formData);

    const errors = validateCommentForm(data);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

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
    const res = await fetch("/api/comments?_=" + Date.now()); // prevent cache
    const comments = await res.json();

    if (comments.length === 0) {
      container.innerHTML =
        "<div class='comment-box'><p>لا توجد تعليقات</p></div>";
      return;
    }

    // Repeat only if there are 3 or more comments
    const displayComments =
      comments.length >= 3 ? [...comments, ...comments, ...comments] : comments;

    container.innerHTML = displayComments
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
    console.error("Error fetching comments:", err);
    container.innerHTML =
      "<div class='comment-box'><p>فشل تحميل التعليقات</p></div>";
  }
}

fetchComments();
