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

    function search() {
        const keyword = searchInput.value

        const result = searchInput.value.trim()
        if (result === "") {
            resultFrame.src = `/components/search.html`

        } else {
            resultFrame.src = `/components/search.html?query=` + encodeURIComponent(keyword)
            resultFrame.style.display = 'block'
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            search()
        })

        // searchInput.addEventListener('focus', () => {
        //     resultFrame.style.width = '70%'
        // })

        // searchInput.addEventListener('blur', () => {
        //     resultFrame.style.width = '0%'
        // })
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
})