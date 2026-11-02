// Generic fetch template loader
const loadTemplate = async (url, containerId) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = data;
    }
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
  }
};

// Mobile drawer dropdown toggle logic
function initMobileNav() {
  const headerContainer = document.querySelector("#headerContainer");
  const hamburgerBar = document.querySelector(".mobile-bars");

  hamburgerBar.onclick = (e) => {
    e.stopPropagation();
    headerContainer.classList.toggle("nav-expanded");
  };

  document.addEventListener("click", (e) => {
    if (!headerContainer.contains(e.target)) {
      headerContainer.classList.remove("nav-expanded");
    }
  });
}

// Dynamic active link highlighting based on the browser URL
function updateActiveLinks() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Sequential Initialization: Wait until templates mount before running DOM queries
async function initApp() {
  await loadTemplate("navbar.html", "headerContainer");
  await loadTemplate("footer.html", "footerContainer");

  initMobileNav();
  updateActiveLinks();
}

initApp();
