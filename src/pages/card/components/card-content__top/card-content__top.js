const initCatalogScripts = () => {
    const changer = document.querySelector('.card-top__quantity_changer')
    const changerInput = changer.querySelector('.changer__input')
    const changerMinus = changer.querySelector('.changer__btn_minus')
    const changerPlus = changer.querySelector('.changer__btn_plus')
    const cardSliderImages = document.querySelector('.card-slider__images')
    const cardSliderMainImg = document.querySelector('.card-slider__main img')
    const cardSliderImg = document.querySelectorAll('.card-slider__image')

    function allowNumbersOnly(e) {
        let code = (e.which) ? e.which : e.keyCode;
        if (code > 31 && (code < 48 || code > 57)) {
            e.preventDefault();
        }
    }

    const customSelect = document.querySelectorAll('.custom-select')
    customSelect.forEach(el => {
        el.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('custom-select--open')

            if (e.target.classList.contains('custom-select__option')) {
                e.currentTarget.querySelector('.custom-select__value').textContent = e.target.textContent
            }
        })
    })

    cardSliderImages.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-slider__image')) {
            let src = e.target.querySelector('img').getAttribute('src')
            cardSliderMainImg.setAttribute('src', src)
        }

        cardSliderImg.forEach(el => {
            el.classList.remove('card-slider__image_active')
        })

        e.target.classList.add('card-slider__image_active')
    })

    let count = changerInput.value

    changerInput.addEventListener('keyup', (e) => {
        if (e.currentTarget.value == '0') {
            e.currentTarget.value = 1
        }

        count = changerInput.value
    })

    changerInput.addEventListener('keypress', (e) => {
        allowNumbersOnly(e);
    })

    changerInput.addEventListener('change', (e) => {
        if (!e.currentTarget.value || e.currentTarget.value < 1) {
            e.currentTarget.value = 1
        }
        count = changerInput.value;
    })

    changerInput.addEventListener('input', (e) => {
        if (e.currentTarget.value <= 1) {
            changerMinus.classList.add('changer__btn_disabled')
            changerPlus.classList.remove('changer__btn_disabled')
        } else {
            changerMinus.classList.remove('changer__btn_disabled')
        }

        if (e.currentTarget.value > 9998) {
            changerMinus.classList.remove('changer__btn_disabled')
            changerPlus.classList.add('changer__btn_disabled')
        } else {
            changerPlus.classList.remove('changer__btn_disabled')
        }
    })

    changerMinus.addEventListener('click', (e) => {
        count--

        changerInput.value = count

        if (!changerInput.value) {
            changerInput.value = 1
            changerMinus.classList.add('changer__btn_disabled')
            changerPlus.classList.remove('changer__btn_disabled')
        }

        if (changerInput.value <= 1) {
            changerInput.value = 1
            changerMinus.classList.add('changer__btn_disabled')
            changerPlus.classList.remove('changer__btn_disabled')
        } else {
            changerMinus.classList.remove('changer__btn_disabled')
        }
    })

    changerPlus.addEventListener('click', (e) => {
        count++

        changerMinus.classList.remove('changer__btn_disabled')

        changerInput.value = count

        if (changerInput.value > 9998) {
            changerInput.value = 9999
            changerPlus.classList.add('changer__btn_disabled')
        } else {
            changerPlus.classList.remove('changer__btn_disabled')
        }
    })
}

window.addEventListener('load', initCatalogScripts)