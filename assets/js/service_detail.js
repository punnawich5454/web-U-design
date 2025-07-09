document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.tree-keed')
  const navBlock = document.querySelector('.block-nav')
  const searchInput = document.getElementById('search-input')
  const resultFrame = document.getElementById('iframe-search')

  const API = 'http://127.0.0.1:3000'

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

  // window.addEventListener('scroll', function () {
  //   const scrolled = window.pageYOffset;
  //   const parallax = document.querySelector('.hero-section');
  //   const speed = scrolled * 0.5;
  //   parallax.style.transform = `translateY(${speed}px)`;
  // });

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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

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

  const progressBar = document.getElementById('progressBar');
  const params = new URLSearchParams(window.location.search)
  const catId = params.get('cat')

  const apis = [
    API + '/api/categories',
    API + `/api/category/${catId}`,
    API + `/api/products/category/${catId}`

  ];

  const totalApis = apis.length;
  let loadedApis = 0;

  function updateProgress() {
    loadedApis++;
    const percent = (loadedApis / totalApis) * 100;
    progressBar.style.width = percent + '%';

    if (loadedApis === totalApis) {
      progressBar.classList.add('complete');
      setTimeout(() => {
        progressBar.style.display = 'none'
      }, 400);
    }
  }

  async function loadAllAPIs() {
    const promises = apis.map(url =>
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .catch(err => {
          console.error('โหลด API ล้มเหลว:', url, err);
        })
        .finally(() => {
          updateProgress();
        })
    );

    await Promise.allSettled(promises);
  }

  loadAllAPIs();

  async function loadCategory() {
    const response = await fetch(API + '/api/categories');
    const data = await response.json();

    const categoryButton = document.querySelector('.category-buttons');
    data.categories.forEach(item => {
      const a = document.createElement('a');
      a.href = `/page/service_detail.html?cat=${item._id}`;
      const button = document.createElement('button')
      button.classList.add('category-btn')
      button.textContent = item.name
      a.appendChild(button)
      categoryButton.appendChild(a);
    })
  }

  loadCategory()


  async function loadCategoryById() {
    const params = new URLSearchParams(window.location.search)
    const catId = params.get('cat')

    const respones1 = await fetch(API + `/api/category/${catId}`)
    const data1 = await respones1.json()

    const container = document.querySelector('.container')
    const h1 = document.createElement('h1')
    h1.className = 'page-title'
    h1.textContent = data1.name
    container.appendChild(h1)

    const respones = await fetch(API + `/api/products/category/${catId}`)
    const data = await respones.json()
    const sidebarUl = document.getElementById('sidebar-ul')
    data.products.forEach(item => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = `#${item.name}`
      a.textContent = item.name
      li.appendChild(a)
      sidebarUl.appendChild(li)

      const serviceSections = document.createElement('div')
      serviceSections.classList.add('service-section')
      const divServiceImages = document.createElement('div')
      divServiceImages.classList.add('service-images')
      serviceSections.id = item.name
      for (let i = 0; i < 3; i++) {
        const divServiceImage = document.createElement('div')
        divServiceImage.classList.add('service-image')
        const img = document.createElement('img')
        img.src = `data:image/jpeg;base64, ${item.image[i]}`
        divServiceImage.appendChild(img)
        divServiceImages.appendChild(divServiceImage)
      }
      serviceSections.appendChild(divServiceImages)

      const h2 = document.createElement('h2')
      h2.classList.add('service-title')
      h2.textContent = item.name
      const p = document.createElement('p')
      p.className = 'service-description'
      p.textContent = item.description
      serviceSections.appendChild(h2)
      serviceSections.appendChild(p)

      container.appendChild(serviceSections)
    })
  }

  function scrollToHash() {
    const hash = decodeURIComponent(location.hash.substring(1));
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  loadCategoryById().then(() => {
    scrollToHash();
  });


})