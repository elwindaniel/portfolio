// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("back-to-top");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

function openMobileMenu() {
  mobileMenu.classList.add("active");
  mobileMenuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Back to top functionality
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formMessage = document.getElementById("form-message");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
      formMessage.textContent = "Please fill in all required fields.";
      formMessage.className = "error";
      formMessage.style.display = "block";
      return;
    }

    // Simulate form submission success
    console.log("Form submission simulated.");

    // Display success message
    formMessage.textContent =
      "Thank you for your message! I'll get back to you shortly.";
    formMessage.className = "success";
    formMessage.style.display = "block";

    // Clear the form
    e.target.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
      formMessage.classList.remove("success", "error");
    }, 5000);
  });

// Add animation to skill icons on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "pulse 0.6s ease";
      setTimeout(() => {
        entry.target.style.animation = "";
      }, 600);
    }
  });
}, observerOptions);

// Observe skill icons
document.querySelectorAll(".skills-icons i").forEach((icon) => {
  observer.observe(icon);
});


// --- FORM SUBMISSION TO GOOGLE FORMS ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (!form) return; // Safety check

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show loading text
    formMessage.textContent = "Sending...";
    formMessage.className = "info";
    formMessage.style.display = "block";

    // Send form data to Google
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    })
      .then(() => {
        // Show success message
        formMessage.textContent = "✅ Thank you! Your message has been sent successfully.";
        formMessage.className = "success";
        form.reset();

        // Hide the message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      })
      .catch(() => {
        formMessage.textContent = "❌ Something went wrong. Please try again.";
        formMessage.className = "error";
      });
  });
});