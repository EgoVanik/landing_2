//slides- селектор
// dir - положение
const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1, //текущий слайд
        paused = false;

    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1; // показываем столько слайдов, сколько есть
        }

        if (n < 1) {
            slideIndex = items.length; // крайнее значение кол-ва сладов
        }

        // показываем/скрываем слайды
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        // переключаем
        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    // 
    function plusSlides(n) {
        showSlides(slideIndex += n); // показываем на один слайд больше или на один меньше, по клику
    }

    // если селекторы кнопок не переданы, чтобы всё не сломалось
    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);// предыдущий слайд
            items[slideIndex - 1].classList.remove('slideInLeft'); // удаляем класс
            items[slideIndex - 1].classList.add('slideInRight'); // перемещаемся вправо
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1); // след. слайд
            items[slideIndex + 1].classList.remove('slideInRight');// перемещаемся вправо
            items[slideIndex + 1].classList.add('slideInRight'); // добавляем класс с анимацией
        });
    } catch(e){}

    function activateAnimation() {
        // направление
        if (dir === 'vertical') {
            // автопереключение слайдов
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    };
    activateAnimation();

    // когда пользователь наводит мышку на область слайдера, очищаем setInterval
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    // когда убирает мышку - включачем setInterval
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};
export default sliders;