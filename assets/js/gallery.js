let showingCategories = false;

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
                searchInput.blur()
            } else {
                header.style.top = '0px'
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

function toggleCategories() {
  const extra = document.getElementById("extraCategories");
  const btn = document.querySelector(".toggle-btn");

  if (showingCategories) {
    extra.classList.remove("show");
    btn.textContent = "ดูเพิ่มเติม +";
  } else {
    extra.classList.add("show");
    btn.textContent = "ซ่อน -";
  }
  showingCategories = !showingCategories;
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const items = document.querySelectorAll(".item");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");

      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        item.style.display =
          category === "all" || itemCategory === category ? "block" : "none";
      });
    });
  });
});

// Function to load products from database
function loadProducts() {
  const servicesContainer = document.querySelector('.services-container');
  servicesContainer.innerHTML = ''; // Clear existing content

  // Loop through products in database
  database.products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('data-category', getCategoryForProduct(product.id));

    const link = document.createElement('a');
    link.href = `/page/product.html?id=${product.id}`;

    const img = document.createElement('img');
    img.src = product.images[0];
    img.alt = product.name;

    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail-item';

    const nameP = document.createElement('p');
    nameP.className = 'main-detail-text';
    nameP.textContent = product.name;

    detailDiv.appendChild(nameP);
    link.appendChild(img);
    link.appendChild(detailDiv);
    item.appendChild(link);
    servicesContainer.appendChild(item);
  });
}

// Helper function to get category for a product
function getCategoryForProduct(productId) {
  for (const category of database.categories) {
    if (category.products.includes(productId)) {
      return category.name.toLowerCase();
    }
  }
  return 'other';
}

// Function to filter products by category
function filterProducts(category) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Add event listeners for category filtering
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Add click handlers for category links
  const categoryLinks = document.querySelectorAll('.nav-menu a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');

      // Update active state
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      filterProducts(category);
    });
  });
});
