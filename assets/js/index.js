document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.tree-keed')
    const navBlock = document.querySelector('.block-nav')
    const header = document.getElementById('header-con')
    let lastScrollTop = 0

    const API = 'https://wed-u-design-backend-production-65e0.up.railway.app'

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
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 0;
    let autoSlideInterval;
    let autoSlideTimeout;

    async function loadBanner() {
        const response = await fetch(API + '/api/banners');
        const data = await response.json();

        bannerContent.innerHTML = '';
        data.banners.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('banner-image');
            const img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + item.image;
            div.appendChild(img);
            bannerContent.appendChild(div);
        });

        setupSlider();
    }

    let sliderEventBound = false;
    function setupSlider() {
        // คำนวณ visibleSlides ใหม่ทุกครั้ง
        const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
        // Remove all cloned slides (keep only original slides)
        let allSlides = Array.from(bannerContent.querySelectorAll('.banner-image'));
        // Remove old clones (clones are always at the end)
        while (bannerContent.children.length > allSlides.length) {
            bannerContent.removeChild(bannerContent.lastChild);
        }
        // อัปเดต allSlides หลังลบ clone
        allSlides = Array.from(bannerContent.querySelectorAll('.banner-image'));
        let slideCount = allSlides.length;

        // ถ้ามี slide เดียวหรือ slideCount <= visibleSlides ไม่ต้อง clone
        if (slideCount > 1 && slideCount < visibleSlides + 1) {
            // clone ให้ครบ visibleSlides
            for (let i = 0; i < visibleSlides - slideCount + 1; i++) {
                const clone = allSlides[i % slideCount].cloneNode(true);
                bannerContent.appendChild(clone);
            }
            slideCount = Array.from(bannerContent.querySelectorAll('.banner-image')).length;
        } else if (slideCount > 1) {
            // clone เท่ากับ visibleSlides
            for (let i = 0; i < visibleSlides; i++) {
                const clone = allSlides[i % slideCount].cloneNode(true);
                bannerContent.appendChild(clone);
            }
        }

        // update slideCount อีกครั้งหลัง clone
        slideCount = Array.from(bannerContent.querySelectorAll('.banner-image')).length - (slideCount > 1 ? visibleSlides : 0);

        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('span');

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (slideCount > 0) dots[index % slideCount].classList.add('active');
        }

        function slideTo(index, withTransition = true) {
            if (slideCount <= 1) return; // ไม่เลื่อนถ้ามี slide เดียว
            const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
            bannerContent.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
            bannerContent.style.transform = `translateX(-${index * slideWidth}%)`;
            currentIndex = index;
            updateDots(index % slideCount);
        }

        function nextSlide() {
            if (slideCount <= 1) return;
            currentIndex++;
            slideTo(currentIndex);
            if (currentIndex >= slideCount) {
                setTimeout(() => {
                    slideTo(0, false);
                }, 500);
            }
        }

        function prevSlide() {
            if (slideCount <= 1) return;
            if (currentIndex === 0) {
                const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
                bannerContent.style.transition = 'none';
                bannerContent.style.transform = `translateX(-${slideCount * slideWidth}%)`;
                currentIndex = slideCount;
                setTimeout(() => {
                    slideTo(currentIndex - 1);
                }, 20);
            } else {
                currentIndex--;
                slideTo(currentIndex);
            }
        }

        function startAutoSlide() {
            if (slideCount <= 1) return;
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlideDelay() {
            stopAutoSlide();
            clearTimeout(autoSlideTimeout);
            if (slideCount <= 1) return;
            autoSlideTimeout = setTimeout(() => {
                startAutoSlide();
            }, 5000);
        }

        // Bind events only once
        if (!sliderEventBound) {
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

            document.querySelector('.banner-section').addEventListener('mouseenter', () => {
                stopAutoSlide();
                clearTimeout(autoSlideTimeout);
            });

            document.querySelector('.banner-section').addEventListener('mouseleave', () => {
                resetAutoSlideDelay();
            });

            // ใช้ debounce resize เพื่อป้องกัน event ซ้อน
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    currentIndex = 0;
                    loadBanner();
                }, 200);
            });
            sliderEventBound = true;
        }

        currentIndex = 0;
        if (slideCount > 1) {
            slideTo(0, false);
            startAutoSlide();
        } else {
            bannerContent.style.transition = 'none';
            bannerContent.style.transform = 'translateX(0)';
        }
    }

    // ไม่ต้องใช้ฟังก์ชัน cloneSlides แยกอีกต่อไป (ย้าย logic ไปใน setupSlider)

    loadBanner();

    async function loadeVisitor() {
        const response = await fetch(API + '/api/visit')
        const data = await response.json()

        const counterNumber = document.querySelector('.counter-number')
        counterNumber.textContent = data.uniqueCount
    }

    loadeVisitor()

        async function loadCategory() {
        const response = await fetch(API + '/api/categories')
        const data = await response.json()

        const productItem = document.getElementById('product-item')
        data.categories.forEach(item => {
            const a = document.createElement('a')
            a.href = "/service.html"
            a.classList.add("product-item-con")
            a.setAttribute("data-aos", "fade-up")
            const div = document.createElement('div')
            div.classList.add('product-item-con-image')
            const img = document.createElement('img')
            img.src = `data:image/jpeg;base64, ${item.image}`
            img.alt = item.name
            const div1 = document.createElement('div')
            div1.classList.add("product-item-con-text")
            const h3 = document.createElement('h3')
            h3.textContent = item.name
            div1.appendChild(h3)
            div.appendChild(img)
            a.appendChild(div)
            a.appendChild(div1)
            productItem.appendChild(a)
        })
    }

    const searchInput = document.getElementById('search-input');
    const iframeSearch = document.getElementById('iframe-search');

    async function loadeSearch() {
        const searchValue = searchInput.value.trim();
        if (searchValue === "") {
            iframeSearch.style.display = 'none';
        } else {
            iframeSearch.src = `/components/search.html?query=${encodeURIComponent(searchValue)}`;
            iframeSearch.style.display = 'block';
        }
    }


    searchInput.addEventListener('input', () => {
        loadeSearch();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    })

    loadCategory()

    const progressBar = document.getElementById('progressBar');

    const apis = [
        API + '/api/banners',
        API +'/api/visit',
        API +'/api/categories'
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

})

