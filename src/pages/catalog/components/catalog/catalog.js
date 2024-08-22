let prevCurrentHeight

function initToggleCatalogList() {
    const btns = [
        ...document.querySelectorAll('.catalog-page__title'),
        ...document.querySelectorAll('.catalog-page__item-title')
    ]

    if (!btns) return

    btns.forEach(el => el.addEventListener('click', () => {
        if (el.classList.contains('catalog-page__title') && window.innerWidth >= 1200) return

        const isOpen = el.classList.contains('open')

        if (window.innerWidth >= 1200) {
            closeAllCollapses(el)
        }

        if (isOpen) {
            collapsesCloser(el)
            if (el.nextElementSibling) collapsesCloser(el.nextElementSibling)
        } else {
            el.classList.add('open')
            if (el.nextElementSibling) el.nextElementSibling.classList.add('open')
        }

        if (window.innerWidth >= 1200) {
            resetAllCardsHeight(el)
            fixAllCardsHeight()
        }
    }))
}

function collapsesCloser(node) {
    // закрываем текущий
    node.classList.remove('open')

    // закрываем вложенные
    node.querySelectorAll('.open')
        .forEach(i => i.classList.remove('open'))
}

function closeAllCollapses(node) {
    const allCards = document.querySelectorAll('.catalog-page__card')
    const currentCard = node.closest('.catalog-page__card')

    allCards.forEach(card => {
        if (card !== currentCard) { // Если не текущая карточка, закрываем все открытые
            card.querySelectorAll('.open')
                .forEach(el => el.classList.remove('open'))
        } else {
            const allRoots = card.querySelectorAll('.catalog-page__root')
            const currentRoot = node.closest('.catalog-page__root')

            allRoots.forEach(root => { // В текущей карточке закрываем все в не текущем руте
                if (root !== currentRoot) {
                    root.querySelectorAll('.open')
                        .forEach(el => el.classList.remove('open'))
                }
            })
        }
    })
}

function resetAllCardsHeight(node) {
    const currentCard = node ? node.closest('.catalog-page__card') : null
    const allCards = document.querySelectorAll('.catalog-page__card')

    allCards.forEach(card => {
        if (card !== currentCard) {
            card.removeAttribute('style')
            card.style.transition = 'all .1s linear'
        } else {
            prevCurrentHeight = card.style.minHeight === '' ? null : parseFloat(card.style.minHeight)
            card.removeAttribute('style')
        }
    })
}

function fixAllCardsHeight(node) {
    const collapses = document.querySelectorAll('.catalog-page__collapse.open')
    let collapseBottom = 0
    let collapseNode

    collapses.forEach(collapse => {
        const bottom = collapse.getBoundingClientRect().bottom + window.pageYOffset
        if (bottom > collapseBottom) {
            collapseBottom = bottom
            collapseNode = collapse
        }
    })

    if (!collapseNode) {
        resetAllCardsHeight()
        return
    }

    const card = collapseNode.closest('.catalog-page__card')
    const cardBottom = card.getBoundingClientRect().bottom + window.pageYOffset

    if (collapseBottom > cardBottom) {
        const delta = collapseBottom - cardBottom
        const cardHeight = card.offsetHeight
        const cardPaddingBottom = parseFloat(window.getComputedStyle(card).paddingBottom)
        const newHeight = cardHeight + delta + cardPaddingBottom

        card.style.transition = null
        card.style.minHeight = prevCurrentHeight + 'px'

        setTimeout(() => {
            card.style.transition = 'all .1s linear'
            card.style.minHeight = newHeight + 'px'
        }, 10)
    }
}

function initLinkHover() {
    const actions = document.querySelectorAll('[data-pic]')

    if (!actions) return

    const updatePic = window.debounce((e, reset) => {

        if (window.innerWidth < 1200) return

        const picNode = e.target.closest('.catalog-page__card')
                .querySelector('.catalog-page__pic')

        if (reset) {
            picNode.removeAttribute('style')
            return
        }

        picNode.style.backgroundImage = `url(${e.target.dataset.pic})`
    }, 300)

    actions.forEach(el => {
        el.addEventListener('mouseenter', e => updatePic(e))
        el.addEventListener('mouseleave', e => updatePic(e, true))
    })
}

window.addEventListener('load', () => {
    // const catalogPageTop = document.querySelectorAll('.catalog-page__top');

    // // catalogPageCard.addEventListener('click', (e) => {
    // //     console.log(e.target);

    // // })
    // catalogPageTop.forEach(el => {
    //     // el.stopPropagation();
    //     el.addEventListener('click', (e) => {
    //         // console.log(el);
    //         // e.stopPropagation();
    //         el.closest('.catalog-page__card').classList.toggle('catalog-page__card_open')
    //         // el.querySelector('.card-filter__title').classList.toggle('card-filter__title--active')

    //     })
    // })
    // // Добавляем сюда все скрипты для Catalog.catalog-page__card_open

    initToggleCatalogList()
    initLinkHover()
})