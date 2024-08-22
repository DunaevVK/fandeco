const initCatalogScripts = () => {
    console.log('Здесь можно добавить JS для КарточкиКаталога');
}

window.addEventListener('load', () => {

    // Добавляем сюда все скрипты для Catalog
    const changer = document.querySelector('.card-top__quantity_changer');
    const changerInput = changer.querySelector('.changer__input');
    const changerMinus = changer.querySelector('.changer__btn_minus');
    const changerPlus = changer.querySelector('.changer__btn_plus');
    const cardSliderImages = document.querySelector('.card-slider__images');
    const cardSliderMainImg = document.querySelector('.card-slider__main img');
    const cardSliderImg = document.querySelectorAll('.card-slider__image')

    cardSliderImages.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-slider__image')) {
            let src = e.target.querySelector('img').getAttribute('src');
            cardSliderMainImg.setAttribute('src', src)

        }

        cardSliderImg.forEach(el => {
            el.classList.remove('card-slider__image_active')
        })
        e.target.classList.add('card-slider__image_active')
    })


    changerInput.addEventListener('input', (e) => {
        if (e.currentTarget.value <= 1) {
            changerMinus.classList.add('changer__btn_disabled')
            changerPlus.classList.remove('changer__btn_disabled')
        } else {
            changerMinus.classList.remove('changer__btn_disabled')
        }
        if (e.currentTarget.value > 998) {
            changerMinus.classList.remove('changer__btn_disabled')
            changerPlus.classList.add('changer__btn_disabled')
        } else {
            changerPlus.classList.remove('changer__btn_disabled')
        }

    })

    changerMinus.addEventListener('click', (e) => {
        let currentValue = parseInt(changerInput.value);
        currentValue--;
        changerInput.value = currentValue;
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
        let currentValue = parseInt(changerInput.value);
        currentValue++;
        changerMinus.classList.remove('changer__btn_disabled')
        changerInput.value = currentValue;
        if (changerInput.value > 998) {
            changerInput.value = 999

            changerPlus.classList.add('changer__btn_disabled')
        } else {
            changerPlus.classList.remove('changer__btn_disabled')
        }
    })

    initCatalogScripts()
})