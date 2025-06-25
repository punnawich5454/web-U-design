// Category button functionality
const categoryButtons = document.querySelectorAll('.category-btn');
const serviceSections = document.querySelectorAll('.service-section');



// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scroll for sidebar links
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // ปรับ offset ตาม header
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active link on scroll
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = Array.from(sidebarLinks).map(link => document.querySelector(link.getAttribute('href')));
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 120;
  sections.forEach((section, idx) => {
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      sidebarLinks.forEach(link => link.classList.remove('active'));
      sidebarLinks[idx].classList.add('active');
    }
  });
});

