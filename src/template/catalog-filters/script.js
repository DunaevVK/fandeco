const initCatalogFiltersScripts = () => {
    console.log('Здесь можно добавить JS для Catalog-filters');
}

window.addEventListener('load', () => {

    // Добавляем сюда все скрипты для Catalog-filters
    const catalogFilterTop = document.querySelectorAll('.catalog-filter__top');
    const catalogFilter = document.querySelectorAll('.catalog-filter');
    const catalogFilterBtn = document.querySelector('.catalog-filters__btn').addEventListener('click', () => {
        catalogFilter.forEach(el => {
            el.closest('.catalog-filter').classList.toggle('catalog-filter--show')
        })
    });
    catalogFilterTop.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.catalog-filter').classList.toggle('catalog-filter--open')
        })
    })
    initCatalogFiltersScripts()
})
