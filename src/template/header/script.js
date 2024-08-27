const initHeaderScripts = () => {
        // Добавляем сюда все скрипты для хедера
        const menuBurger = document.querySelector(".header-info__menu--burger")
        const menu = document.querySelector(".nav-mobile")

        const cff = document.querySelectorAll(".nav-mobile__title")

        const cards = document.querySelectorAll(".nav-mobile__top")
        const bottom = document.querySelectorAll(".nav-mobile__bottom")

        menuBurger.addEventListener("click", () => {
            menuBurger.classList.toggle("header-info__menu--burger-active")
            menu.classList.toggle("nav-mobile--display")
        })

        cards.forEach(el => {
            el.addEventListener("click", () => {
                el.closest('.nav-mobile__card').querySelector('.nav-mobile__open-icon').classList.toggle('nav-mobile__open-icon--active')
                el.closest('.nav-mobile__card').querySelectorAll(".nav-mobile__bottom").forEach(e => {
                    e.classList.toggle('nav-mobile__bottom-open')
                })
            })
        })
}

window.addEventListener("load", () => {
    initHeaderScripts()
})