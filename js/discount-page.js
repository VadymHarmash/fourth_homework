// Створюємо привітальну анімацію

function createDiscountPage(){
    const page = document.createElement('div')
    page.classList.add('discount')
    
    const content = document.createElement('div')
    content.classList.add('discount__content')
    content.innerHTML = `
        <p>120% discount. Only today, ${month} ${date.getDate()}</p>
        <p class="smile">:)</p>
    `
    
    page.append(content)
    document.body.prepend(page)
    setTimeout(() => {
        const smile = content.querySelector('.smile')
        smile.style.opacity = 1
    }, 2000)

    setTimeout(() => {
        page.style.opacity = 0
        setTimeout(() => {
            page.style.display = 'none'
        }, 300)
    }, 5000)
}