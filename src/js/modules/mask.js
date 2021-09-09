// масска ввода номера телефона на нативном JS
const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos); // устанавливаем начальное и конечное положение выделения текста в input
        } else if (elem.createTextRange) {
            let range = elem.createTextRange(); // для старых браузеров(ручной полифил)

            range.collapse(true); // объединяем граничные точки диапазона (первое с последним)
            range.moveEnd('character', pos); // конечная точка выделения
            range.moveStart('character', pos); // начальная точка выделения
            range.select();// устанавливаем курсор и выделяем то значение, которое сформировалось при moveEnd & moveStart
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___-__-__',//маска
            i = 0, //итератор
            def = matrix.replace(/\D/g, ''),// убираем не цифры
            val = this.value.replace(/\D/g, '');

        // если к-во цифр >= кол-ву в value,заменяем на стандартное(+7)
        if(def.length >= val.length){
            val = def;
        }

        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; // проходимся по всем элементам, убираем '_', оставляем (), заменяем val
        });

        // если маска пустая, показываем пустой input
        if (event.type === 'blur') {
            if(this.value.length == 2){
                this.value = '';
            } else {
                setCursorPosition(this.value.length);
            }
        }
    };

    // получаем inputs по селектору и на каждый вешаем обработчики событий
    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};
export default mask;