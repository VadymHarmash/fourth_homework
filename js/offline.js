// Робимо сторінку, яка закриває сайт, якщо користувач нічого не робить

let timerId
let alertWindow
let seconds = 30
let lastMouseX = -1
let lastMouseY = -1

function createAlertWindow() {
    alertWindow = document.createElement('div')
    alertWindow.classList.add('alert-window')

    const alertContent = document.createElement('div')
    alertContent.classList.add('alert-window__content')
    alertContent.innerHTML = `<p>Ви ще тут? Сторінка закриється через <span id="remaining-time">${seconds}</span> секунд</p>`

    alertWindow.append(alertContent)
    document.body.prepend(alertWindow)
}

function removeAlertWindow() {
    if (alertWindow) {
        alertWindow.remove()
    }
}

function updateRemainingTime() {
    const remainingTimeElement = document.getElementById('remaining-time')
    if (remainingTimeElement) {
        remainingTimeElement.textContent = seconds
    }
}

function checkUserActivity() {
    removeAlertWindow()
    createAlertWindow()

    clearInterval(timerId)
    timerId = setInterval(function () {
        seconds--
        updateRemainingTime()
        if (seconds <= 0) {
            clearInterval(timerId)
            window.close()
        }
    }, 1000)
}

function resetTimer() {
    clearInterval(timerId)
    seconds = 30
    updateRemainingTime()
    timerId = setInterval(checkUserActivity, 60000)
}

function handleMouseMove(event) {
    const { pageX, pageY } = event
    if (pageX !== lastMouseX || pageY !== lastMouseY) {
        lastMouseX = pageX
        lastMouseY = pageY
        resetTimer()
        removeAlertWindow()
    }
}

function handleKeyDown() {
    resetTimer()
    removeAlertWindow()
}

function handleClick() {
    resetTimer()
    removeAlertWindow()
}

window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('keydown', handleKeyDown)
window.addEventListener('click', handleClick)

// Початковий запуск таймера при завантаженні сторінки
timerId = setInterval(checkUserActivity, 60000) // Перевірка через 5 секунд
