document.addEventListener("DOMContentLoaded", function () {
  const ACTIVECLASS = "active";
  const IMAGES = document.querySelectorAll(".flex-card-img");

  function removeActiveClass() {
    const active = document.querySelector(`.${ACTIVECLASS}`);
    if (active) active.classList.remove(ACTIVECLASS);
  }

  function addActiveClass(e) {
    removeActiveClass();
    e.currentTarget.classList.add(ACTIVECLASS);
  }

  IMAGES.forEach(img => {
    img.addEventListener("click", addActiveClass);
  });
});
