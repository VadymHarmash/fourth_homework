// Підтягування актуального місяця і використання його в контенті footer__copyright

const footer = document.querySelector('.footer__copyright')
footer.innerHTML = `Copyright @ ${date.getFullYear()} Brandoxide.all right reserved.`