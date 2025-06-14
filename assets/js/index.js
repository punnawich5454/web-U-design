document.addEventListener('DOMContentLoaded', () => {
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

    loadProduct()

    window.addEventListener('resize', () => {
        loadProduct()
    })

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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
})

