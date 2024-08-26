const initHeaderScripts = () => {
    console.log("Здесь можно добавить JS для хедера");
};

window.addEventListener("load", () => {

    // Добавляем сюда все скрипты для хедера
    const menuBurger = document.querySelector(".header-info__menu--burger");
    const menu = document.querySelector(".nav-mobile");

    const cff = document.querySelectorAll(".nav-mobile__title");

    const cards = document.querySelectorAll(".nav-mobile__top");
    const bottom = document.querySelectorAll(".nav-mobile__bottom");

    menuBurger.addEventListener("click", () => {
        menuBurger.classList.toggle("header-info__menu--burger-active")
        menu.classList.toggle("nav-mobile--display");

    });
    // cff.forEach(el => {
    //     // console.log(el);
    //     el.addEventListener('click', (e) => {
    //         console.log(e.currentTarget.querySelector('.nav-mobile__bottom'));

    //         // el.querySelector('.nav-mobile__bottom').classList.toggle('nav-mobile__bottom-open')
    //         el.querySelector('.nav-mobile__bottom')
    //     })

    // });
    cards.forEach(el => {
        el.addEventListener("click", () => {
            el.closest('.nav-mobile__card').querySelector('.nav-mobile__open-icon').classList.toggle('nav-mobile__open-icon--active')
            el.closest('.nav-mobile__card').querySelectorAll(".nav-mobile__bottom").forEach(e => {
                e.classList.toggle('nav-mobile__bottom-open')
            })
        });
    });

    // bottom.forEach(el => {
    //     el.addEventListener("click", () => {
    //         el.querySelector('.nav-mobile__bottom').classList.toggle("nav-mobile__bottom-open")
    //         el.querySelector('.nav-mobile__list').classList.toggle("nav-mobile__list-open");
    //     })
    // })



    initHeaderScripts();
});