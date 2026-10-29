// SCRIPT.JS - Interactivity for beginner portfolio
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to ${profile.name}'s first-year CSE portfolio!");

  // 1. Dark Mode Toggle with localStorage Memory
  const headerContainer = document.querySelector(".header-container");
  let themeToggleBtn = document.getElementById("theme-toggle-btn");

  if (!themeToggleBtn && headerContainer) {
    themeToggleBtn = document.createElement("button");
    themeToggleBtn.id = "theme-toggle-btn";
    themeToggleBtn.className = "theme-toggle";
    themeToggleBtn.setAttribute("aria-label", "Toggle dark/light mode");
    themeToggleBtn.type = "button";
    
    const navCta = headerContainer.querySelector(".nav-cta");
    if (navCta) {
      headerContainer.insertBefore(themeToggleBtn, navCta);
    } else {
      headerContainer.appendChild(themeToggleBtn);
    }
  }

  const savedTheme = localStorage.getItem("portfolio-theme");

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Light";
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      if (themeToggleBtn) themeToggleBtn.textContent = "🌙 Dark";
      localStorage.setItem("portfolio-theme", "light");
    }
  }

  if (savedTheme === "dark") {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isCurrentlyDark = document.body.classList.contains("dark-mode");
      applyTheme(!isCurrentlyDark);
    });
  }

  // 2. Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // 3. Floating "Back to Top" Button
  let backToTopBtn = document.getElementById("floating-back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "floating-back-to-top";
    backToTopBtn.className = "floating-back-to-top";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = "↑";
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // 4. One-Click Copy Email Button
  const copyBtn = document.getElementById("copy-email-btn");
  const emailToCopy = "${profile.email}";

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailToCopy)
        .then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "Copied! ✓";
          copyBtn.classList.add("btn-copied");

          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove("btn-copied");
          }, 2500);
        })
        .catch(() => {
          alert("Email: " + emailToCopy);
        });
    });
  }
});