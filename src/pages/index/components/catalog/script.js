const initCatalogScripts = () => {
    console.log('Здесь можно добавить JS для Каталога');
}

window.addEventListener('load', () => {

    // Добавляем сюда все скрипты для Catalog
    const customSelect = document.querySelectorAll('.custom-select')
    console.log(customSelect);

    const customSelectIcon = document.querySelectorAll('.sort__select-icon')
    customSelect.forEach(el => {
        el.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('custom-select--open')

            if (e.target.classList.contains('custom-select__option')) {
                // console.log(e.currentTarget);
                e.currentTarget.querySelector('.custom-select__value').textContent = e.target.textContent;
            }
            if (e.target.classList.contains('sort__select-icon')) {
                console.log(e.currentTarget);
            }
        })

    })
    initCatalogScripts()
})