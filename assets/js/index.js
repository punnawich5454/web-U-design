document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.tree-keed')
    const navBlock = document.querySelector('.block-nav')
    const searchInput = document.getElementById('search-input')
    const resultFrame = document.getElementById('iframe-search')

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

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
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop

        if (currentScroll > lastScrollTop) {
            header.style.top = '-100px'
            navBlock.style.display = 'none'
            resultFrame.style.display = 'none'
            searchInput.blur()
        } else {
            header.style.top = '0px'
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    })

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });

    // async function loadProduct() {
    //     try {
    //         const response = await fetch('http://1:3000/api/products')
    //         const data = await response.json()

    //         const dataLimit = data.slice(0, 10)
    //         const productItem = document.getElementById('product-item')
    //         productItem.innerHTML = ""
    //         dataLimit.forEach(item => {
    //             const div = document.createElement('div')
    //             div.classList.add('product')
    //             div.setAttribute('data-aos', 'fade-up')
    //             const html = `
    //                 <div class="image-product">
    //                     <img src="data:image/jpeg;base64,${item.images}" alt="img-product">
    //                 </div>
    //                 <div class="name-product">
    //                     <span>${item.name}</span>
    //                 </div>`
    //             div.innerHTML += html
    //             productItem.appendChild(div)
    //         });
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    // function search() {
    //     const keyword = searchInput.value

    //     const result = searchInput.value.trim()
    //     if (result === "") {
    //         resultFrame.src = `/components/search.html`

    //     } else {
    //         resultFrame.src = `/components/search.html?query=` + encodeURIComponent(keyword)
    //         resultFrame.style.display = 'block'
    //     }
    // }

    // if (searchInput) {
    //     searchInput.addEventListener('input', () => {
    //         search()
    //     })

    // searchInput.addEventListener('focus', () => {
    //     resultFrame.style.width = '70%'
    // })

    // searchInput.addEventListener('blur', () => {
    //     resultFrame.style.width = '0%'
    // })
    // }

    // document.getElementById('button-1').addEventListener('click', (event) => {
    //     event.preventDefault()
    //     search()
    // })

    // loadProduct()

    const clickLogo = document.querySelector('.logo')
    clickLogo.addEventListener('click', () => {
        window.location = '/index.html'
    })

    const blockAbout = document.getElementById('block-about')
    blockAbout.addEventListener('click', () => {
        window.location = '/about.html'
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
})

