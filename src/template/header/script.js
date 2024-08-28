const initHeaderScripts = () => {
    // Добавляем сюда все скрипты для хедера
    const menuBurger = document.querySelector(".header-info__menu--burger")
    const menu = document.querySelector(".nav-mobile")
    const closeMenu = document.querySelector(".nav-mobile__header_close")
    const openSubMenu = document.querySelector(".nav-mobile__open-icon")

    const initMenu = () => {
        openSubMenu.classList.remove('nav-mobile__open-icon_active');
        document.querySelector('.nav-mobile__list_drop').classList.remove('nav-mobile__list_drop-open')
        document.querySelectorAll('.drop-submenu__list').forEach(el => {
            el.classList.remove('drop-submenu__list_open')
        })
        document.querySelectorAll('.drop-submenu__item').forEach(el => {
            el.classList.remove('drop-submenu__item_open')
        })
    }

    menuBurger.addEventListener("click", () => {
        menu.classList.add("nav-mobile__open");
        initMenu();
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove("nav-mobile__open");
    })

    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-mobile__link_drop') || e.target.classList.contains('nav-mobile__open-icon')) {
            e.preventDefault();
            e.target.closest('.nav-mobile__list').querySelector('.nav-mobile__list_drop').classList.toggle('nav-mobile__list_drop-open');
            openSubMenu.classList.toggle('nav-mobile__open-icon_active');
        }
        if (e.target.classList.contains('drop-submenu__title') || e.target.classList.contains('drop-submenu__plus')) {
            e.target.closest('.drop-submenu__item').querySelector('.drop-submenu__list').classList.toggle('drop-submenu__list_open')
            e.target.closest('.drop-submenu__item').classList.toggle('drop-submenu__item_open')
        }
    })
}

window.addEventListener("load", () => {
    initHeaderScripts()
})