/* Menu (show/hidden) */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/* Menu (show) */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

/* Menu (hidden) */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

/* Mobile menu */
const navLink = document.querySelectorAll(".nav-link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/* Skills (accordion) */
const skillsContent = document.getElementsByClassName("skills-container-content"),
  skillsHeader = document.querySelectorAll(".skills-container-header")

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills-container-content skills-close";
  }
  if (itemClass === "skills-container-content skills-close") {
    this.parentNode.className = "skills-container-content skills-open"
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills)
})

/* Experience tabs */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]")

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("experience-active")
    })
    target.classList.add("experience-active")

    tabs.forEach((tab) => {
      tab.classList.remove("experience-active")
    })
    tab.classList.add("experience-active")
  })
})

/* Articles swiper */
const swiperArticles = new Swiper(".articles-container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})

/* Scroll sections (active link) */
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link")
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/* Background header */
function scrollHeader() {
  const nav = document.getElementById("header")

  if (this.scrollY >= 80) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/* Show scroll to top */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")

  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/* Dark/Light mode */
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "fa-sun"

const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun"

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme)
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

/* Mail integration */
document.addEventListener("DOMContentLoaded", function() {
  emailjs.init("A9PZASRNY-NxAYHQX")
})

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault()

  emailjs.sendForm('service_btvk1js', 'template_zhvgvnk', this)
    .then(function(response) {
      console.log('Success!', response.status, response.text)
      alert('Email sent successfully!')
      document.getElementById('contact-form').reset()
    }, function(error) {
      console.log('Failed...', error)
      alert('Email sending failed.')
    })
})
