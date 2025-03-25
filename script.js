// DOM Elements
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")
const nav = document.querySelector("nav")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contactForm")

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark")

  // Save theme preference to localStorage
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark")
}

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Active link highlighting based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// Project Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block"

        // Add animation
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"

        // Hide after animation completes
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show a success message
    console.log({ name, email, subject, message })

    // Show success message
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group) => (group.style.display = "none"))

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    submitBtn.style.display = "none"

    const successMessage = document.createElement("div")
    successMessage.classList.add("success-message")
    successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
        `

    contactForm.appendChild(successMessage)

    // Reset form after 5 seconds
    setTimeout(() => {
      contactForm.reset()
      successMessage.remove()
      formGroups.forEach((group) => (group.style.display = "block"))
      submitBtn.style.display = "block"
    }, 5000)
  })
}

// Animation on scroll
window.addEventListener("DOMContentLoaded", () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-item, .project-card, .about-content, .contact-container")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  // Add CSS for animation
  const style = document.createElement("style")
  style.textContent = `
        .skill-item, .project-card, .about-content, .contact-container {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)

  // Run animation check on load and scroll
  animateOnScroll()
  window.addEventListener("scroll", animateOnScroll)
})

// Add this function to handle the about section animations
function animateAboutSection() {
  // We're not doing any animations that hide content now
  // This function is kept for compatibility but doesn't do anything that would hide text
  console.log("About section loaded")
}

// Add this at the end of the file to initialize parallax effect
document.addEventListener("DOMContentLoaded", () => {
  // Initialize parallax effect
  const scene = document.getElementById("scene")
  // Declare Parallax
  const Parallax = window.Parallax
  const parallaxInstance = new Parallax(scene)

  // Check for saved theme preference on page load
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }

  // Initialize about section animations
  animateAboutSection()

  // Add animation delay to skill items
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item, index) => {
    item.style.setProperty("--i", index)
  })

  // Add scroll reveal animations
  const scrollReveal = () => {
    const elements = document.querySelectorAll(".skill-category, .about-content, .contact-container, .project-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  // Add hover animations for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const techTags = this.querySelectorAll(".project-tech span")
      techTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.05}s`
      })
    })

    card.addEventListener("mouseleave", function () {
      const techTags = this.querySelectorAll(".project-tech span")
      techTags.forEach((tag) => {
        tag.style.transitionDelay = "0s"
      })
    })
  })

  // Add animated cursor effect
  const cursor = document.createElement("div")
  cursor.classList.add("cursor")
  document.body.appendChild(cursor)

  const cursorDot = document.createElement("div")
  cursorDot.classList.add("cursor-dot")
  document.body.appendChild(cursorDot)

  document.addEventListener("mousemove", (e) => {
    cursor.style.cssText = cursorDot.style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`
  })

  // Add cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .theme-toggle, .project-card")
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-active")
      cursorDot.classList.add("cursor-dot-active")
    })

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-active")
      cursorDot.classList.remove("cursor-dot-active")
    })
  })

  // Add CSS for cursor
  const style = document.createElement("style")
  style.textContent = `
        .cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            z-index: 9999;
            opacity: 0.5;
        }
        
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        
        .cursor-active {
            width: 60px;
            height: 60px;
            border-color: var(--primary-color);
            opacity: 0.2;
        }
        
        .cursor-dot-active {
            width: 12px;
            height: 12px;
        }
        
        @media (max-width: 768px) {
            .cursor, .cursor-dot {
                display: none;
            }
        }
    `
  document.head.appendChild(style)

  // Run animation check on load and scroll
  scrollReveal()
  window.addEventListener("scroll", scrollReveal)

  // Add typing animation to hero section
  const heroTitle = document.querySelector(".hero-content h1")
  const originalText = heroTitle.innerHTML
  heroTitle.innerHTML = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.innerHTML += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 50)
    }
  }

  setTimeout(typeWriter, 500)

  // Add 3D tilt effect to project cards
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const cardRect = this.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2
      const angleY = (e.clientX - cardCenterX) / 15
      const angleX = (cardCenterY - e.clientY) / 15

      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-15px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
    })
  })

  // Add particle animation to hero section
  const createParticles = () => {
    const particleContainer = document.createElement("div")
    particleContainer.classList.add("particle-container")
    document.querySelector("header").appendChild(particleContainer)

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random position, size and animation delay
      const size = Math.random() * 8 + 2
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 10 + 10

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${posX}%`
      particle.style.top = `${posY}%`
      particle.style.animationDelay = `${delay}s`
      particle.style.animationDuration = `${duration}s`

      particleContainer.appendChild(particle)
    }

    // Add CSS for particles
    const particleStyle = document.createElement("style")
    particleStyle.textContent = `
            .particle-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 1;
            }

            .particle {
                position: absolute;
                background-color: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                animation: floatParticle linear infinite;
            }

            @keyframes floatParticle {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(particleStyle)
  }

  createParticles()
})
