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

    async function loadeProduct() {
        const response = await fetch('http://127.0.0.1:8000/product')
        const data = await response.json();

        const prodoctItem = document.getElementById('product-item')
        data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add('product')
            div.setAttribute("data-aos", "fade-up");
            div.innerHTML = `
                <div class="image-product">
                    <img src="data:image/jpeg;base64,${item.image}" alt="">
                </div>
                <div class="name-product">
                    <span>${item['name']}</span>
                </div>`
            prodoctItem.appendChild(div)
        });
    }

    loadeProduct()
})