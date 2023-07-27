// Здобуття даних з апі і створення блоку services

const buttons = document.querySelector('.services__buttons')
const wrapper = document.querySelector('.services__item-wrapper')

// Власне здобуття даних

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    const posts = data.map((post) => ({ id: post.id, title: post.title, body: post.body })).slice(0, 10)
    return posts
}

// Функція, яка генерує html до відповідної колекції

function renderHTML(posts) {
    return posts.map(({ title, body }) => `
        <div class='services__item-wrapper__post'>
            <h2 class='title'>TITLE: ${title}</h2>
            <p class='description'>CONTENT: ${body}</p>
        </div>
    `).join('')
}

// Створення колекції і їх відмальовка

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
    wrapper.innerHTML = renderHTML(allPosts)


    let activeButton = null

    buttons.addEventListener('click', function (event) {
        let currentButton = event.target.closest('.services__buttons__button')

        if (currentButton === activeButton) {
            currentButton.classList.remove('services__buttons__button__active')
            wrapper.innerHTML = renderHTML(allPosts)
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