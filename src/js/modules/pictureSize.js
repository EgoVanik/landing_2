const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block) {
        const img = block.querySelector('img');
        //somethins.png => something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';// отрезаем 4 символа с конца
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    };

    function hideImg(block) {
        const img = block.querySelector('img');
        //something-1.png => somethins.png
        img.src = img.src.slice(0, -6) + '.png';// отрезаем 4 символа с конца
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    };

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });

};
export default pictureSize;