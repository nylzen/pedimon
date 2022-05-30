const navbar = document.getElementById("navbar");
const menu = document.querySelector(".menu");
const item = document.querySelectorAll(".item");

// Show Menu Toggle
menu.addEventListener("click", () => {
  item.forEach((i) => i.classList.toggle("show"));
});

// Show Navbar Scroll
let lastScrollTop;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-150px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});
