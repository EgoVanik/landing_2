const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        // если проскролили 1650px - показываем кнопку "вверх"
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    const element = document.documentElement,
          body = document.body;
    
    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (this.hash !== '') { // example.com/#up (#up - hash)
                event.preventDefault();
                let hashElement = document.querySelector(this.hash),
                    hashElementTop = 0;

                // перебираем px родительских элементов и узнаём сколько px нужно будет пролистать 
                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop; // сколько px осталось до родительского элемента
                    hashElement = hashElement.offsetParent;
                }

                hashElementTop = Math.round(hashElementTop); // округляем

                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1, //интервал
            prevScrollTop, // обратный скролл
            speed; // скролл

            // движение сверху вниз и наоборот
        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }

        // JS-анимация
        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            // если долистали до того момента, который был нужен
            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            )  {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash)
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };
    calcScroll();
};
export default scrolling;