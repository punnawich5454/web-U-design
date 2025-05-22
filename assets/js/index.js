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
})