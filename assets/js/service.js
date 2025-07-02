document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let showAllItems = {};

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

    // ฟังก์ชันสำหรับจำกัดจำนวนรูปที่แสดง
    function limitGalleryItems(filterValue) {
        const isMobile = window.innerWidth <= 768;
        const maxItems = isMobile ? 1 : 6; // Changed from 3 to 1 for mobile

        // ตรวจสอบสถานะ showAll สำหรับหมวดหมู่นี้
        const isShowingAll = showAllItems[filterValue] || false;

        let visibleItems = [];

        // ซ่อนรูปทั้งหมดก่อน
        galleryItems.forEach(item => {
            item.style.display = 'none';
        });

        // รวบรวมรูปที่ควรแสดงตามหมวดหมู่
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            console.log('Item category:', itemCategory, 'Filter:', filterValue); // Debug log
            if (filterValue === 'all' || itemCategory === filterValue) {
                visibleItems.push(item);
            }
        });

        console.log('Total visible items found:', visibleItems.length); // Debug log

        // แสดงรูปตามจำนวนที่กำหนด
        visibleItems.forEach((item, index) => {
            if (isShowingAll || index < maxItems) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
                item.style.animationDelay = `${index * 0.1}s`;
            }
        });

        // จัดการปุ่ม "ดูเพิ่มเติม" - เช็คจำนวนรูปที่มีจริง
        manageShowMoreButton(visibleItems.length, maxItems, filterValue, isShowingAll);
    }



    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // รีเซ็ตสถานะ showAll เมื่อเปลี่ยนหมวดหมู่
            // showAllItems[filterValue] = false; // ลบบรรทัดนี้ถ้าต้องการให้จำสถานะไว้

            // แสดงรูปตามหมวดหมู่และจำกัดจำนวน
            setTimeout(() => {
                limitGalleryItems(filterValue);
            }, 100);
        });
    });

    console.log('DOM loaded, gallery items found:', galleryItems.length); // Debug log

    // รอให้ DOM โหลดเสร็จก่อน
    setTimeout(() => {
        limitGalleryItems('all');
    }, 200);

    window.addEventListener('load', () => {
        console.log('Window loaded'); // Debug log
        // รอให้ DOM โหลดเสร็จก่อน
        setTimeout(() => {
            limitGalleryItems('all');
        }, 200);
    });

    // อัพเดทเมื่อเปลี่ยนขนาดหน้าจอ
    window.addEventListener('resize', () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            const filterValue = activeBtn.getAttribute('data-filter');
            limitGalleryItems(filterValue);
        }
    });



    function closeModal() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal when clicking outside the image
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const progressBar = document.getElementById('progressBar');

    const apis = [
        'http://127.0.0.1:3000/api/categories'
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
        const response = await fetch('http://127.0.0.1:3000/api/categories')
        const data = await response.json()

        const galleryGrid = document.getElementById('galleryGrid')
        data.categories.forEach(item => {
            const a = document.createElement('a')
            a.href = `/page/service_detail.html?cat=${encodeURIComponent(item._id)}`
            const div = document.createElement('div')
            div.classList.add("gallery-item")
            const img = document.createElement('img')
            img.classList.add('gallery-img')
            img.src = `data:image/jpeg;base64, ${item.imge}`
            img.alt = item.name
            const h3 = document.createElement('h3')
            h3.classList.add('gallery-info')
            h3.textContent = item.name
            div.appendChild(img)
            div.appendChild(h3)
            a.appendChild(div)
            galleryGrid.appendChild(a)
        })
    }

    loadCategory()
});