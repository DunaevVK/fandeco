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
    let rangeMin = 100;
    const range = document.querySelector(".range-selected");
    const rangeInput = document.querySelectorAll(".range-input input");
    const rangePrice = document.querySelectorAll(".range-price input");

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minRange = parseInt(rangeInput[0].value);
            let maxRange = parseInt(rangeInput[1].value);
            if (maxRange - minRange < rangeMin) {
                if (e.target.className === "min") {
                    rangeInput[0].value = maxRange - rangeMin;
                } else {
                    rangeInput[1].value = minRange + rangeMin;
                }
            } else {
                rangePrice[0].value = minRange;
                rangePrice[1].value = maxRange;
                range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
                range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
            }
        });
    });

    rangePrice.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = rangePrice[0].value;
            let maxPrice = rangePrice[1].value;
            if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "min") {
                    rangeInput[0].value = minPrice;
                    range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                } else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });
}

window.addEventListener('load', () => {
    initCatalogFiltersScripts()
})
