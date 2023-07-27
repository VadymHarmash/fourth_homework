// Створення слайдеру

function createSlider() {
    const sliderWrapper = document.querySelector('.clients__slider__wrapper')
    const slides = document.querySelectorAll('.clients__slider__wrapper__item')
    const prevButton = document.querySelector('.next-button')
    const nextButton = document.querySelector('.prev-button')

    let currentPosition = 0
    const slideWidth = slides[0].clientWidth
    const gap = 80

    prevButton.addEventListener('click', function () {
        if (currentPosition > 0) {
            currentPosition -= 2;
            sliderWrapper.style.transform = `translateX(-${(currentPosition * (slideWidth + gap))}px)`
        }
    })

    nextButton.addEventListener('click', function () {
        currentPosition += 2
        if (currentPosition >= slides.length) currentPosition = 0
        sliderWrapper.style.transform = `translateX(-${(currentPosition * (slideWidth + gap))}px)`
    })
}

createSlider()