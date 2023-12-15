function showMenu() {
  console.log("click");
  const navLinks = document.querySelector("#navLinks");
  navLinks.style.right = "0";
}

function hideMenu() {
  console.log("click");
  const navLinks = document.querySelector("#navLinks");
  navLinks.style.right = "-200px";
}

export { showMenu, hideMenu };
