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

// function toggleCategories() {
//   const extra = document.getElementById("extraCategories");
//   const btn = document.querySelector(".toggle-btn");

//   if (showingCategories) {
//     extra.classList.remove("show");
//     btn.textContent = "ดูเพิ่มเติม +";
//   } else {
//     extra.classList.add("show");
//     btn.textContent = "ซ่อน -";
//   }
//   showingCategories = !showingCategories;
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav-menu a");
//   const items = document.querySelectorAll(".item");

//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       const category = this.getAttribute("data-category");

//       navLinks.forEach((l) => l.classList.remove("active"));
//       this.classList.add("active");

//       items.forEach((item) => {
//         const itemCategory = item.getAttribute("data-category");
//         item.style.display =
//           category === "all" || itemCategory === category ? "block" : "none";
//       });
//     });
//   });
// });

// Function to load products from database
// function loadProducts() {
//   const servicesContainer = document.getElementById('services-container');
//   servicesContainer.innerHTML = ''; // Clear existing content

//   // Loop through products in database
//   database.products.forEach(product => {
//     const item = document.createElement('div');
//     item.className = 'item';
//     item.setAttribute('data-category', getCategoryForProduct(product.id));

//     const link = document.createElement('a');
//     link.href = `/page/product.html?id=${product.id}`;

//     const img = document.createElement('img');
//     img.src = product.images[0];
//     img.alt = product.name;

//     const detailDiv = document.createElement('div');
//     detailDiv.className = 'detail-item';

//     const nameP = document.createElement('p');
//     nameP.className = 'main-detail-text';
//     nameP.textContent = product.name;

//     detailDiv.appendChild(nameP);
//     link.appendChild(img);
//     link.appendChild(detailDiv);
//     item.appendChild(link);
//     servicesContainer.appendChild(item);
//   });
// }

// // Helper function to get category for a product
// function getCategoryForProduct(productId) {
//   for (const category of database.categories) {
//     if (category.products.includes(productId)) {
//       return category.name.toLowerCase();
//     }
//   }
//   return 'other';
// }

// // Function to filter products by category
// function filterProducts(category) {
//   const items = document.querySelectorAll('.item');
//   items.forEach(item => {
//     if (category === 'all' || item.getAttribute('data-category') === category) {
//       item.style.display = 'block';
//     } else {
//       item.style.display = 'none';
//     }
//   });
// }

// // Add event listeners for category filtering
// document.addEventListener('DOMContentLoaded', () => {
//   loadProducts();

//   // Add click handlers for category links
//   const categoryLinks = document.querySelectorAll('.nav-menu a');
//   categoryLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const category = link.getAttribute('data-category');

//       // Update active state
//       categoryLinks.forEach(l => l.classList.remove('active'));
//       link.classList.add('active');

//       filterProducts(category);
//     });
//   });
// });

// Image Modal Functionality
let currentImageIndex = 0;
let images = [];
let currentZoom = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let lastTranslateX = 0, lastTranslateY = 0;
let dragSensitivity = 0.5; // ปรับความเร็วการลาก (0.1 = ช้ามาก, 1.0 = ปกติ)

AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
    offset: 100,
    delay: 100,
});

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageCounter = document.getElementById('imageCounter');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetZoomBtn = document.getElementById('resetZoomBtn');

    // Get all images from the gallery
    images = Array.from(document.querySelectorAll('.row-image img'));

    // Add click event to all images
    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            openModal(index);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Zoom controls
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetZoomBtn.addEventListener('click', resetZoom);

    // Mouse wheel zoom
    modal.addEventListener('wheel', function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    // Improved mouse drag events
    modalImg.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // Touch events for mobile
    modalImg.addEventListener('touchstart', startDragTouch, { passive: false });
    modalImg.addEventListener('touchmove', dragTouch, { passive: false });
    modalImg.addEventListener('touchend', stopDrag);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        }
    });

    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = images[index].src;
        modal.style.display = 'block';
        resetZoom();
        updateImageCounter();
        updateZoomButtons();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetZoom();
        stopDrag(); // Ensure drag state is reset
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentImageIndex].src;
        resetZoom();
        updateImageCounter();
        updateZoomButtons();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImg.src = images[currentImageIndex].src;
        resetZoom();
        updateImageCounter();
        updateZoomButtons();
    }

    function updateImageCounter() {
        imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    // Zoom functions
    function zoomIn() {
        if (currentZoom < 5) {
            currentZoom *= 1.2;
            applyZoom();
        }
    }

    function zoomOut() {
        if (currentZoom > 0.5) {
            currentZoom /= 1.2;
            applyZoom();
        }
    }

    function resetZoom() {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        lastTranslateX = 0;
        lastTranslateY = 0;
        applyZoom();
        stopDrag();
    }

    function applyZoom() {
        // Calculate boundaries based on zoom level
        const maxTranslateX = Math.max(0, (currentZoom - 1) * 100);
        const maxTranslateY = Math.max(0, (currentZoom - 1) * 100);

        // Constrain translation within boundaries
        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));

        modalImg.style.transform = `translate(-50%, -50%) scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
        updateZoomButtons();

        if (currentZoom > 1) {
            modalImg.classList.add('zoomed');
        } else {
            modalImg.classList.remove('zoomed');
        }
    }

    function updateZoomButtons() {
        zoomInBtn.disabled = currentZoom >= 5;
        zoomOutBtn.disabled = currentZoom <= 0.5;
    }

    // Improved drag functions with sensitivity control
    function startDrag(e) {
        if (currentZoom > 1) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - (translateX / dragSensitivity);
            startY = e.clientY - (translateY / dragSensitivity);
            modalImg.style.cursor = 'grabbing';
            modalImg.style.userSelect = 'none';
        }
    }

    function startDragTouch(e) {
        if (currentZoom > 1 && e.touches.length === 1) {
            e.preventDefault();
            isDragging = true;
            startX = e.touches[0].clientX - (translateX / dragSensitivity);
            startY = e.touches[0].clientY - (translateY / dragSensitivity);
            modalImg.style.userSelect = 'none';
        }
    }

    function drag(e) {
        if (isDragging && currentZoom > 1) {
            e.preventDefault();
            translateX = (e.clientX - startX) * dragSensitivity;
            translateY = (e.clientY - startY) * dragSensitivity;
            applyZoom();
        }
    }

    function dragTouch(e) {
        if (isDragging && currentZoom > 1 && e.touches.length === 1) {
            e.preventDefault();
            translateX = (e.touches[0].clientX - startX) * dragSensitivity;
            translateY = (e.touches[0].clientY - startY) * dragSensitivity;
            applyZoom();
        }
    }

    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = 'grab';
            modalImg.style.userSelect = 'auto';
            lastTranslateX = translateX;
            lastTranslateY = translateY;
        }
    }

    const progressBar = document.getElementById('progressBar');

    const apis = [
        'http://127.0.0.1:3000/api/banners',
        'http://127.0.0.1:3000/api/visit'
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
});
