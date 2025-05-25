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
        if(window.innerWidth > 715) {
            navBlock.style.display = 'none'
        } 
    })

    const header = document.getElementById('header-con')
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop

        if(currentScroll > lastScrollTop) {
            header.style.top = '-100px'
            navBlock.style.display = 'none'
        } else {
            header.style.top = '0px'
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    })

    AOS.init();
})