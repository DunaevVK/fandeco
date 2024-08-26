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

    let rangeMin = 100; //Растояние между ползунками
    const range = document.querySelectorAll(".range"); //Все ползунки на странице

    range.forEach(el => {
        const rangeSelected = el.querySelector(".range-selected");
        const minRangeInput = el.querySelector(".min");
        const maxRangeInput = el.querySelector(".max");
        const minPriceInput = el.querySelector(".price-min");
        const maxPriceInput = el.querySelector(".price-max");

        // Обработчик для ползунков диапазона
        [minRangeInput, maxRangeInput].forEach((input) => {
            input.addEventListener("input", (e) => {
                let minRange = parseInt(minRangeInput.value);
                let maxRange = parseInt(maxRangeInput.value);

                if (maxRange - minRange < rangeMin) {
                    if (e.target.className === "min") {
                        minRangeInput.value = maxRange - rangeMin;
                    } else {
                        maxRangeInput.value = minRange + rangeMin;
                    }
                } else {
                    minPriceInput.value = minRange;
                    maxPriceInput.value = maxRange;
                    rangeSelected.style.left = (minRange / minRangeInput.max) * 100 + "%";
                    rangeSelected.style.right = 100 - (maxRange / maxRangeInput.max) * 100 + "%";
                }
            });
        });

        // Обработчик для ввода цен
        [minPriceInput, maxPriceInput].forEach((input) => {
            input.addEventListener("input", (e) => {
                let minPrice = parseInt(minPriceInput.value);
                let maxPrice = parseInt(maxPriceInput.value);

                if (maxPrice - minPrice >= rangeMin && maxPrice <= maxRangeInput.max) {
                    if (e.target.className === "price-min") {
                        minRangeInput.value = minPrice;
                        rangeSelected.style.left = (minPrice / minRangeInput.max) * 100 + "%";
                    } else {
                        maxRangeInput.value = maxPrice;
                        rangeSelected.style.right = 100 - (maxPrice / maxRangeInput.max) * 100 + "%";
                    }
                }
            });
        });
    })
}

window.addEventListener('load', () => {
    initCatalogFiltersScripts()
})


