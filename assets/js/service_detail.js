document.addEventListener('DOMContentLoaded', () => {
  // Category button functionality
  const categoryButtons = document.querySelectorAll('.category-btn');
  const serviceSections = document.querySelectorAll('.service-section');

  const menuButton = document.querySelector('.tree-keed')
  const navBlock = document.querySelector('.block-nav')
  const searchInput = document.getElementById('search-input')
  const resultFrame = document.getElementById('iframe-search')

  menuButton.addEventListener('click', () => {
    if (navBlock.style.display === 'block') {
      navBlock.style.display = 'none';
    } else {
      navBlock.style.display = 'block';
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 715) {
      navBlock.style.display = 'none'
    }
  })

  const categoryNav = document.querySelector('.category-nav')
  const header = document.getElementById('header-con')
  let lastScrollTop = 0
  window.addEventListener('scroll', () => {
    // ทำงานเฉพาะหน้าจอเล็ก (มือถือ)
    if (window.innerWidth <= 768) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > lastScrollTop) {
        header.style.top = '-380px'
        navBlock.style.display = 'none'
        resultFrame.style.display = 'none'
        categoryNav.style.top = '-380px'
        searchInput.blur()
      } else {
        header.style.top = '0px'
        categoryNav.style.top = '63px'
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    }
  })

  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  });

  function search() {
    const keyword = searchInput.value.trim()
    if (keyword === "") {
      resultFrame.style.display = 'none'
    } else {
      resultFrame.src = `/components/search.html?query=${encodeURIComponent(keyword)}`
      resultFrame.style.display = 'block'
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      search()
    })

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() !== '') {
        resultFrame.style.display = 'block'
      }
    })

    searchInput.addEventListener('blur', () => {
      // Add a small delay to allow clicking on search results
      setTimeout(() => {
        resultFrame.style.display = 'none'
      }, 200)
    })
  }

  document.getElementById('button-1').addEventListener('click', (event) => {
    event.preventDefault()
    search()
  })

  const clickLogo = document.querySelector('.logo')
  clickLogo.addEventListener('click', () => {
    window.location = '/index.html'
  })

  const blockAbout = document.getElementById('block-about')
  blockAbout.addEventListener('click', () => {
    window.location = '/about.html'
  })

  const blockContact = document.getElementById('block-contact')
  blockContact.addEventListener('click', () => {
    window.location = '/contact.html'
  })

  const blockGallery = document.getElementById('block-gallery')
  blockGallery.addEventListener('click', () => {
    window.location = '/gallery.html'
  })

  const blockService = document.getElementById('block-service')
  blockService.addEventListener('click', () => {
    window.location = '/service.html'
  })

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


})