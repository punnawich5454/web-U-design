document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.tree-keed')
    const navBlock = document.querySelector('.block-nav')
    const header = document.getElementById('header-con')
    let lastScrollTop = 0

    const API = 'https://wed-u-design-backend-1.onrender.com'

    document.documentElement.style.scrollBehavior = 'smooth';

    const hasHeaderAOSPlayed = sessionStorage.getItem('hasHeaderAOSPlayed');
    const headerElements = header.querySelectorAll('[data-aos]');

    // ปิด data-aos บนมือถือ
    if (window.innerWidth <= 768) {
        headerElements.forEach(element => {
            element.removeAttribute('data-aos');
        });
    } else {
        if (hasHeaderAOSPlayed) {
            headerElements.forEach(element => {
                element.removeAttribute('data-aos');
            });
        } else {
            sessionStorage.setItem('hasHeaderAOSPlayed', 'true');
        }
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
    const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
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
        // Remove all cloned slides (keep only originals)
        let allSlides = Array.from(bannerContent.querySelectorAll('.banner-image'));
        // Remove all clones (dataset.clone === 'true')
        allSlides.filter(slide => slide.dataset.clone === 'true').forEach(clone => bannerContent.removeChild(clone));
        allSlides = Array.from(bannerContent.querySelectorAll('.banner-image'));
        let slideCount = allSlides.length;

        // Clone for infinite loop effect (mobile: 1, desktop: 3)
        const slidesToClone = window.innerWidth <= 768 ? 1 : 3;
        for (let i = 0; i < slidesToClone; i++) {
            const clone = allSlides[i % slideCount].cloneNode(true);
            clone.dataset.clone = 'true';
            bannerContent.appendChild(clone);
        }

        // Update allSlides and slideCount after cloning
        allSlides = Array.from(bannerContent.querySelectorAll('.banner-image'));
        slideCount = allSlides.length - slidesToClone;

        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('span');

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index % slideCount].classList.add('active');
        }

        function slideTo(index, withTransition = true) {
            const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
            if (!withTransition) {
                bannerContent.style.transition = 'none';
            } else {
                // ป้องกัน transition ซ้อน
                bannerContent.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
            }
            bannerContent.style.transform = `translateX(-${index * slideWidth}%)`;
            currentIndex = index;
            updateDots(index % slideCount);
        }

        function nextSlide() {
            if (currentIndex < slideCount) {
                currentIndex++;
                slideTo(currentIndex);
                if (currentIndex === slideCount) {
                    setTimeout(() => {
                        slideTo(0, false);
                    }, 500);
                }
            }
        }

        function prevSlide() {
            if (currentIndex === 0) {
                const slideWidth = window.innerWidth <= 768 ? 100 : (100 / visibleSlides);
                bannerContent.style.transition = 'none';
                bannerContent.style.transform = `translateX(-${slideCount * slideWidth}%)`;
                setTimeout(() => {
                    currentIndex = slideCount - 1;
                    slideTo(currentIndex);
                }, 20);
            } else {
                currentIndex--;
                slideTo(currentIndex);
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlideDelay() {
            stopAutoSlide();
            clearTimeout(autoSlideTimeout);
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

            window.addEventListener('resize', () => {
                // รีเซ็ต index, ลบ clone เดิม, และ setupSlider ใหม่ (ป้องกันซ้อน)
                if (autoSlideInterval) clearInterval(autoSlideInterval);
                if (autoSlideTimeout) clearTimeout(autoSlideTimeout);
                currentIndex = 0;
                // Remove all clones
                let originals = Array.from(bannerContent.querySelectorAll('.banner-image'));
                originals.filter(slide => slide.dataset.clone === 'true').forEach(clone => bannerContent.removeChild(clone));
                // Reset transition
                bannerContent.style.transition = 'none';
                bannerContent.style.transform = 'translateX(0)';
                setupSlider();
            });
            sliderEventBound = true;
        }

        currentIndex = 0;
        slideTo(0, false);
        startAutoSlide();
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

