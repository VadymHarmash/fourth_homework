// Події при скроллі
// Зміна прогрес-бару

window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolled = (winScroll / height) * 100
    document.querySelector(".header__progress-bar__progressed").style.width = scrolled + "%"
}

// Поява картинок в блоці blog

window.addEventListener('scroll', function () {
    let images = document.querySelectorAll('.article-image')
    let scrollLevel = document.body.scrollTop || document.documentElement.scrollTop
    scrollLevel > 4800 && scrollLevel < 5600 ? images.forEach(image => image.style.opacity = 1) : images.forEach(image => image.style.opacity = 0)
})

// Плавний перехід по анкор-посиланням

const smoothLinks = document.querySelectorAll('a[href^="#"]')
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault()
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}