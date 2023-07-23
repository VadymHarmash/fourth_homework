window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolled = (winScroll / height) * 100
    document.querySelector(".header__progress-bar__progressed").style.width = scrolled + "%"
}