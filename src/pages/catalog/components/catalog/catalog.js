const initCatalogScripts = () => {
    console.log('Здесь можно добавить JS для КарточкиКаталога');
}

window.addEventListener('load', () => {
    const catalogPageTop = document.querySelectorAll('.catalog-page__top');

    // catalogPageCard.addEventListener('click', (e) => {
    //     console.log(e.target);

    // })
    catalogPageTop.forEach(el => {
        // el.stopPropagation();
        el.addEventListener('click', (e) => {
            // console.log(el);
            // e.stopPropagation();
            el.closest('.catalog-page__card').classList.toggle('catalog-page__card_open')
            // el.querySelector('.card-filter__title').classList.toggle('card-filter__title--active')

        })
    })
    // Добавляем сюда все скрипты для Catalog.catalog-page__card_open

    initCatalogScripts()
})