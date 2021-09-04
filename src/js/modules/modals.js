const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = "block";
                document.body.style.overflow ="hidden";
                document.body.style.marginRight = `${scroll}px`;//добавляем margin-rigth
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow ="";
            document.body.style.marginRight = '0px';
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay){
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow ="";
                document.body.style.marginRight = '0px';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            //проверяем отображается ли модальное оокно пользователю в текущий момент времени
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== "none"){
                    display = "block";
                }
            });

            //если ни одно модальное окно не отображается(другое),то показываем его
            if (!display){
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow ="hidden";
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div); //помещаем блок на страницу

        // вычисляем ширину
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    
    showModalByTime('.popup-consultation', 5000);
};

export default modals;