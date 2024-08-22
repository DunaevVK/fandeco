/**
 * Debouncing
 *
 * @param {function} func - колбэк функция для дебаунса
 * @param {number} ms - задержка в миллисекундах
 * @returns {function} - новая дебаунс функция
 */
window.debounce = (func, ms) => {
    let timeoutId

    return function() {
        const context = this
        const args = arguments

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func.apply(context, args)
        }, ms)
    }
}