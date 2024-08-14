const initCatalogFiltersScripts = () => {
    // console.log('Здесь можно добавить JS для Catalog-filters');
    const customCheckbox = document.querySelectorAll('.custom-checkbox');
    const catalogFilterTop = document.querySelectorAll('.catalog-filter__top');
    const catalogFilter = document.querySelectorAll('.catalog-filter');
    document.querySelector('.catalog-filters__btn').addEventListener('click', () => {
        catalogFilter.forEach(el => {
            el.closest('.catalog-filter').classList.toggle('catalog-filter--show')

        })
    });
    catalogFilterTop.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.catalog-filter').classList.toggle('catalog-filter--open')
            el.querySelector('.catalog-filter__title').classList.toggle('catalog-filter__title--active')

        })
    })
    customCheckbox.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            el.classList.toggle('custom-checkbox--active')
        })

    })
}

window.addEventListener('load', () => {
    initCatalogFiltersScripts()
})
