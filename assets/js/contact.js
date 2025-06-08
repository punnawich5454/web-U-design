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
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop

        if (currentScroll > lastScrollTop) {
            header.style.top = '-380px'
            navBlock.style.display = 'none'
            searchInput.blur()
        } else {
            header.style.top = '0px'
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
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

    const buttonLine = document.querySelector('.click-button')
    buttonLine.addEventListener('click', () => {
        window.open("https://page.line.me/myw8485r", "_blank");
    })
    // function line() {
    //     window.open("https://page.line.me/myw8485r", "_blank");
    // }
})