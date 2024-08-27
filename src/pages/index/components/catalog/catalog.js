const initCatalogScripts = () => {
    const customSelect = document.querySelectorAll('.custom-select')

    customSelect.forEach(el => {
        el.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('custom-select--open')

            if (e.target.classList.contains('custom-select__option')) {

            }

            if (e.target.classList.contains('custom-select__option')) {
                e.currentTarget.querySelector('.custom-select__value').textContent = e.target.textContent;
            }
        })
    })
}

window.addEventListener('load', initCatalogScripts)