document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.tree-keed')
    const navBlock = document.querySelector('.block-nav')
    const searchInput = document.getElementById('search-input')
    const resultFrame = document.getElementById('iframe-search')
    const header = document.getElementById('header-con')
    let lastScrollTop = 0

    document.documentElement.style.scrollBehavior = 'smooth';

    const hasHeaderAOSPlayed = sessionStorage.getItem('hasHeaderAOSPlayed');
    const headerElements = header.querySelectorAll('[data-aos]');

    if (hasHeaderAOSPlayed) {
        headerElements.forEach(element => {
            element.removeAttribute('data-aos');
        });
    } else {
        sessionStorage.setItem('hasHeaderAOSPlayed', 'true');
    }

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

    // Scroll event listener for header visibility and smooth scrolling
    // window.addEventListener('scroll', () => {
    //     const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    //     // Show/hide header based on scroll direction
    //     if (currentScroll > lastScrollTop && currentScroll > 100) {
    //         // Scrolling down
    //         header.style.transform = 'translateY(-100%)';
    //         navBlock.style.display = 'none';
    //         resultFrame.style.display = 'none';
    //         searchInput.blur();
    //     } else {
    //         // Scrolling up
    //         header.style.transform = 'translateY(0)';
    //     }

    //     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    // })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function loadProduct() {
        const productItem = document.getElementById('product-item')
        const isMobile = window.innerWidth <= 740;
        const products = db.getAllProducts().slice(0, isMobile ? 6 : 10)
        productItem.innerHTML = ""
        products.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('product')
            div.setAttribute('data-aos', 'fade-up')
            div.onclick = () => window.location.href = `/page/product.html?id=${item.id}`
            const html = `
                <div class="image-product">
                    <img src="${item.image}" alt="img-product">
                </div>
                <div class="name-product">
                    <span>${item.name}</span>
                </div>`
            div.innerHTML += html
            productItem.appendChild(div)
        })
    }

    // loadProduct()

    // window.addEventListener('resize', () => {
    //     loadProduct()
    // })

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
            // search()
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
        // search()
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

    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles()

    const loader = document.getElementById('loader-frame');
    const main = document.getElementById('main-ss');

    const hasLoadedBefore = sessionStorage.getItem('hasLoaded');

    if (!hasLoadedBefore) {
        loader.classList.add('visible');
    } else {
        loader.style.display = 'none';
        main.style.display = 'flex';
        main.style.opacity = '1';

        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'loaderFinished') {
            const loader = document.getElementById('loader-frame');
            const main = document.getElementById('main-ss');

            loader.classList.remove('visible');
            loader.classList.add('fade-out');

            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';

                main.style.display = 'flex';
                requestAnimationFrame(() => {
                    main.classList.add('visible');
                });

                sessionStorage.setItem('hasLoaded', 'true');

                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100
                });
            }, { once: true });
        }
    });

    const bannerContent = document.querySelector('.banner-content');
    const slides = document.querySelectorAll('.banner-image');
    const dotsContainer = document.querySelector('.dots');
    let visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // Clone slides ตามจำนวนที่แสดง
    function cloneSlides() {
        const slidesToClone = window.innerWidth <= 768 ? 1 : 3;
        for (let i = 0; i < slidesToClone; i++) {
            const clone = slides[i].cloneNode(true);
            bannerContent.appendChild(clone);
        }
    }
    cloneSlides();

    // สร้าง dot เท่ากับจำนวนภาพทั้งหมด
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dots span');

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index % slideCount].classList.add('active');
    }

    // slideTo รับ index เป็นตำแหน่ง slide (0 ถึง slideCount-1)
    function slideTo(index) {
        const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
        bannerContent.style.transition = 'transform 0.5s ease-in-out';
        bannerContent.style.transform = `translateX(-${index * slideWidth}%)`;
        currentIndex = index;
        updateDots(index);
    }

    function nextSlide() {
        currentIndex++;
        slideTo(currentIndex);

        if (currentIndex >= slideCount) {
            setTimeout(() => {
                bannerContent.style.transition = 'none';
                bannerContent.style.transform = 'translateX(0)';
                currentIndex = 0;
                updateDots(currentIndex);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
            bannerContent.style.transition = 'none';
            bannerContent.style.transform = `translateX(-${slideCount * slideWidth}%)`;
            currentIndex = slideCount;
            setTimeout(() => {
                bannerContent.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                slideTo(currentIndex);
            }, 20);
        } else {
            currentIndex--;
            slideTo(currentIndex);
        }
    }

    // เพิ่ม event listener สำหรับการ resize
    window.addEventListener('resize', () => {
        const newVisibleSlides = window.innerWidth <= 768 ? 1 : 3;
        if (newVisibleSlides !== visibleSlides) {
            // รีเซ็ต slider เมื่อเปลี่ยนขนาดหน้าจอ
            bannerContent.style.transition = 'none';
            bannerContent.style.transform = 'translateX(0)';
            currentIndex = 0;
            updateDots(currentIndex);

            // ลบ clones เก่าทั้งหมด
            const allSlides = bannerContent.querySelectorAll('.banner-image');
            const originalSlides = slides.length;
            for (let i = originalSlides; i < allSlides.length; i++) {
                allSlides[i].remove();
            }
            
            // สร้าง clones ใหม่
            cloneSlides();
            
            // อัปเดตตัวแปร visibleSlides
            visibleSlides = newVisibleSlides;
        }
    });

    dotsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = Array.from(dotsContainer.children).indexOf(e.target);

            if (index !== currentIndex) {
                slideTo(index);     // ใช้ slideTo เดิมที่มี transition
                stopAutoSlide();    // หยุดแล้วเริ่มใหม่
                startAutoSlide();
            }
        }
    });


    document.querySelector('.banner-section').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.banner-section').addEventListener('mouseleave', startAutoSlide);

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    let autoSlideTimeout = null;

    // เรียกทุกครั้งที่มีการ interaction
    function resetAutoSlideDelay() {
        stopAutoSlide(); // หยุดก่อน
        clearTimeout(autoSlideTimeout); // ยกเลิก timeout เก่า ถ้ามี
        autoSlideTimeout = setTimeout(() => {
            startAutoSlide(); // กลับมาเลื่อนใหม่
        }, 5000); // 5 วินาที (คุณเปลี่ยนได้)
    }

    // เปลี่ยนทุกที่ที่มี interaction
    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        resetAutoSlideDelay();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide();
        resetAutoSlideDelay();
    });

    dotsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = Array.from(dotsContainer.children).indexOf(e.target);
            slideTo(index);
            resetAutoSlideDelay();
        }
    });

    // หยุดเมื่อ hover
    document.querySelector('.banner-section').addEventListener('mouseenter', () => {
        stopAutoSlide();
        clearTimeout(autoSlideTimeout); // หยุด timeout ด้วย
    });

    // กลับมาเลื่อนต่อเมื่อออกจาก hover
    document.querySelector('.banner-section').addEventListener('mouseleave', () => {
        resetAutoSlideDelay();
    });

})

