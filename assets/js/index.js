document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.tree-keed')
    const navBlock = document.querySelector('.block-nav')

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
        } else {
            header.style.top = '0px'
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    })

    AOS.init();

    async function loadProduct() {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/product')
            const data = await response.json()

            const productItem = document.getElementById('product-item')
            data.forEach(item => {
                const div = document.createElement('div')
                div.classList.add('product')
                div.setAttribute('data-aos', 'fade-up')
                const html = `
                    <div class="image-product">
                        <img src="data:image/jpeg;base64,${item.image}" alt="">
                    </div>
                    <div class="name-product">
                        <span>${item.name}</span>
                    </div>`
                div.innerHTML += html
                productItem.appendChild(div)
            });
        } catch (err) {
            console.error(err)
        }
    }

    function search() {
        const keyword = document.getElementById('search-input').value
        const resultFrame = document.getElementById('iframe-search')

        const result = searchInput.value.trim()
        if (result === "") {
            resultFrame.src = `/components/search.html`
        } else {
            resultFrame.src = `/components/search.html?query=` + encodeURIComponent(keyword)    
        }
    }

    const searchInput = document.getElementById('search-input')
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            search()
        })
    }

    document.getElementById('button-1').addEventListener('click', (event) => {
        event.preventDefault()
        search()
    })

    loadProduct()
})

