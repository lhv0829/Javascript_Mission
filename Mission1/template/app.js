// do something!
const toggle = document.getElementsByClassName("toggle")[0];
const sidebar = document.getElementsByTagName("nav")[0];

let open = localStorage.getItem("open");
if (open === "true") sidebar.classList.add("active");

window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
  document.body.classList.remove("preload");
});

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) localStorage.setItem("open", true);
  if (!sidebar.classList.contains("active")) localStorage.setItem("open", false);
});
