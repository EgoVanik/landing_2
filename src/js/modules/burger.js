const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
    burgerElem = document.querySelector(burgerSelector);

    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        // если меню не отображается и ширина экрана менше 993px,то показываем меню
        if (menuElem.style.display == "none" && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        // если ширина > 992, скрываем бургер
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });

};
export default burger;