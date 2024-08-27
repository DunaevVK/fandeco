const initHeaderScripts = () => {

        const menuBurger = document.querySelector(".header-info__menu--burger")
        const menu = document.querySelector(".nav-mobile")

        const cards = document.querySelectorAll(".nav-mobile__top")
        const bottom = document.querySelectorAll(".nav-mobile__bottom")

        menuBurger.addEventListener("click", () => {
            menuBurger.classList.toggle("header-info__menu--burger-active")
            menu.classList.toggle("nav-mobile--display")
        })

        cards.forEach(el => {
            el.addEventListener("click", (e) => {
                const parent = el.closest('.nav-mobile__card')
                const icon = parent.querySelector('.nav-mobile__open-icon')
                const bottoms = parent.querySelectorAll(".nav-mobile__bottom")

                if (icon) {
                    icon.classList.toggle('nav-mobile__open-icon--active')
                }

                if (bottoms) {
                    bottoms.forEach( el => {
                        el.classList.toggle('nav-mobile__bottom-open')
                    })
                }
            })
        })

        const titles = document.querySelectorAll('.nav-mobile__title')

        if (titles) {
            titles.forEach(el => el.addEventListener('click', () => {
                const parent = el.closest('.nav-mobile__bottom')

                if (!parent) return

                const list = parent.querySelector('.nav-mobile__list')

                if (list) list.classList.toggle('nav-mobile__list-open')
            }))
        }
}

window.addEventListener("load", () => {
    initHeaderScripts()
})