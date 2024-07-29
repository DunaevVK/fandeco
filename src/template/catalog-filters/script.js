const initCatalogFiltersScripts = () => {
    console.log('Здесь можно добавить JS для Catalog-filters');
}

window.addEventListener('load', () => {

    // Добавляем сюда все скрипты для Catalog-filters
    const catalogFilter = document.querySelectorAll('.catalog-filter__top');
    catalogFilter.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.catalog-filter').classList.toggle('catalog-filter--open')
        })
    })
    initCatalogFiltersScripts()
})
