const initCardBottom = () => {
    const cardFilterTop = document.querySelectorAll('.card-filter__top')
    const cardFilterTopSub = document.querySelectorAll('.card-filter__top_sub')
    const downloadDocsTop = document.querySelectorAll('.download-docs__top')
    cardFilterTop.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.card-filter').classList.toggle('card-filter--open')
            el.querySelector('.card-filter__title').classList.toggle('card-filter__title--active')

        })
    })
    cardFilterTopSub.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.card-filter__bottom').classList.toggle('card-filter__bottom--open')
            el.querySelector('.card-filter__title').classList.toggle('card-filter__title--active')

        })
    })
    downloadDocsTop.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.download-docs').classList.toggle('download-docs--open')
            el.querySelector('.download-docs__title').classList.toggle('download-docs__title--active')

        })
    })
}

window.addEventListener('load', initCardBottom)