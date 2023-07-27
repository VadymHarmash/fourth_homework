// Валідація форми

function validateForm() {
    const submitButton = document.querySelector('.button-input')
    const inputs = document.querySelectorAll('.shop__form__input')
    const nameRegex = /^[A-Z][a-zA-Z]*$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const letters = /^[a-zA-Z]+$/
    const numbers = /^[0-9]+$/
    const nameWarnings = document.querySelector('.shop__form__name__warnings')
    const emailWarnings = document.querySelector('.shop__form__email__warnings')

    submitButton.addEventListener('click', function () {
        let nameWarningMessages = []
        let emailWarningMessages = []

        inputs.forEach((input) => {
            if (input.classList.contains('name-input')) {
                const value = input.value.trim()

                if (!value) {
                    if (input.classList.contains('firstname-input')) nameWarningMessages.push('Write your name')
                    if (input.classList.contains('lastname-input')) nameWarningMessages.push('Write your surname')
                } else {
                    if (value[0].toUpperCase() !== value[0]) nameWarningMessages.push('First letter must be capitalized in name and surname')
                    if (!letters.test(value)) nameWarningMessages.push('Use only latin letters')
                    if (numbers.test(value)) nameWarningMessages.push('You cannot use numbers')
                    if (input.value.includes(' ')) nameWarningMessages.push('Spaces are not allowed in name and surname')
                }

                input.classList.toggle('invalid', !nameRegex.test(value))
            }

            if (input.classList.contains('email-input')) {
                const value = input.value.trim()

                if (!value) {
                    input.classList.add('invalid')
                    emailWarningMessages.push('Write your email')
                } else {
                    if (emailRegex.test(value)) {
                        input.classList.remove('invalid')
                    } else {
                        input.classList.add('invalid')
                        emailWarningMessages.push('Incorrect email')
                    }
                    if (input.value.includes(' ')) emailWarningMessages.push('Spaces are not allowed in name and surname')
                }
            }
        })

        nameWarningMessages = Array.from(new Set(nameWarningMessages))
        emailWarningMessages = Array.from(new Set(emailWarningMessages))

        nameWarnings.innerHTML = nameWarningMessages.length > 0 ? `
            <ul>${nameWarningMessages.map((warning) => `<li>${warning}</li>`).join('')}</ul>
        ` : ''
        
        emailWarnings.innerHTML = emailWarningMessages.length > 0 ? `
            <ul>${emailWarningMessages.map((warning) => `<li>${warning}</li>`).join('')}</ul>
        ` : ''

        if (nameWarningMessages.length === 0 && emailWarningMessages.length === 0) {
            localStorage.setItem('Firstname', document.querySelector('.firstname-input').value)
            localStorage.setItem('Lastname', document.querySelector('.lastname-input').value)
            localStorage.setItem('Email', document.querySelector('.email-input').value)

            if(document.querySelector('.firstname-input').value === 'Sigma') createDiscountPage()
        }
    })
}

validateForm()
