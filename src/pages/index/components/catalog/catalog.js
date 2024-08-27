const initCatalogScripts = () => {
        // Добавляем сюда все скрипты для Catalog
        const customSelect = document.querySelectorAll('.custom-select')

        const customSelectIcon = document.querySelectorAll('.sort__select-icon')

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

window.addEventListener('load', () => {
    initCatalogScripts()
})