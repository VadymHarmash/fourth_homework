window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolled = (winScroll / height) * 100
    document.querySelector(".header__progress-bar__progressed").style.width = scrolled + "%"
}

window.addEventListener('scroll', function () {
    let images = document.querySelectorAll('.article-image')
    let scrollLevel = document.body.scrollTop || document.documentElement.scrollTop
    scrollLevel > 5100 && scrollLevel < 5900 ? images.forEach(image => image.style.opacity = 1) : images.forEach(image => image.style.opacity = 0)
})

const buttons = document.querySelector('.services__buttons')
const wrapper = document.querySelector('.services__item-wrapper')

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    const posts = data.map((post) => ({ id: post.id, title: post.title, body: post.body })).slice(0, 10)
    return posts
}

function renderHTML(posts) {
    return posts.map(({ title, body }) => `
        <div class='services__item-wrapper__post'>
            <h2 class='title'>TITLE: ${title}</h2>
            <p class='description'>CONTENT: ${body}</p>
        </div>
    `).join('')
}

(async function makeCollections() {
    const posts = await getData()

    const interiorPosts = posts.filter(post => post.id <= 3).map(post => ({ title: post.title, body: post.body }))
    const architecturePosts = posts.filter(post => post.id >= 4 && post.id <= 7).map(post => ({ title: post.title, body: post.body }))
    const planningPosts = posts.filter(post => post.id >= 8).map(post => ({ title: post.title, body: post.body }))
    const allPosts = [
        interiorPosts[interiorPosts.length - 1],
        architecturePosts[architecturePosts.length - 1],
        planningPosts[planningPosts.length - 1]
    ]

    let activeButton = null
    wrapper.innerHTML = renderHTML(allPosts)

    buttons.addEventListener('click', function (event) {
        let currentButton = event.target.closest('.services__buttons__button')

        if (currentButton === activeButton) {
            currentButton.classList.remove('services__buttons__button__active')
            postsHTML = renderHTML(allPosts)
            wrapper.innerHTML = postsHTML
            activeButton = null
        } else {
            if (activeButton) activeButton.classList.remove('services__buttons__button__active')

            currentButton.classList.add('services__buttons__button__active')
            activeButton = currentButton

            if (currentButton.classList.contains('interior')) postsHTML = renderHTML(interiorPosts)
            if (currentButton.classList.contains('architecture')) postsHTML = renderHTML(architecturePosts)
            if (currentButton.classList.contains('planning')) postsHTML = renderHTML(planningPosts)
            if (currentButton.classList.contains('all-posts')) postsHTML = renderHTML(allPosts)

            wrapper.innerHTML = postsHTML
        }
    })
})()

function createCarousel() {
    const carouselWrapper = document.querySelector('.clients__slider__wrapper')
    const slides = document.querySelectorAll('.clients__slider__wrapper__item')
    const prevButton = document.querySelector('.next-button')
    const nextButton = document.querySelector('.prev-button')

    let currentPosition = 0
    const slideWidth = slides[0].clientWidth
    const gap = 80

    prevButton.addEventListener('click', function () {
        if (currentPosition > 0) {
            currentPosition -= 2;
            carouselWrapper.style.transform = `translateX(-${(currentPosition * (slideWidth + gap))}px)`
        }
    })

    nextButton.addEventListener('click', function () {
        currentPosition += 2
        if (currentPosition >= slides.length) currentPosition = 0
        carouselWrapper.style.transform = `translateX(-${(currentPosition * (slideWidth + gap))}px)`
    })
}

createCarousel()
