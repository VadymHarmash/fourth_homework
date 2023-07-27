// Сторінка завантаження

let loadingPage = document.querySelector('.loading')
setTimeout(() => {
    loadingPage.style.opacity = 0
    document.body.style.overflowY = "scroll"
    setTimeout(() => {
        loadingPage.style.display = 'none'
    }, 300)
}, 1000)