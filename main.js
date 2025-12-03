let cards = Array.from(document.querySelectorAll('.block'));
let orderRange = [...Array(cards.length).keys()];
shuffle(orderRange);
cards.forEach((card, index) => {
    card.style.order = orderRange[index];
});

window.onload = () => {
    document.querySelector('.splash input').focus();
}

let game = document.querySelector('.game');
document.querySelector('.splash span').onclick = () => {
    document.querySelector('.blocks').style.transform = 'translateY(0)';
    game.classList.add('no-click');
    setTimeout(() => flipAll(), 500);
    setTimeout(() => {
        flipAll();
        game.classList.remove('no-click');
    }, 1500);
    let name = document.querySelector('.splash input').value;
    document.querySelector('.name span').innerHTML = name ? name : "Player1";
    document.querySelector('.splash').remove();
}

let duration = 1000;
cards.forEach((card) => {
    card.onclick = () => {
        card.classList.add('flipped');
        let flippedCards = cards.filter((c) => c.classList.contains('flipped'));
        if (flippedCards.length === 2) {
            game.classList.add('no-click');
            setTimeout(() => {
                game.classList.remove('no-click');
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
            }, duration);
            if (flippedCards[0].dataset.img === flippedCards[1].dataset.img) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                let matchedCards = cards.filter((c) => c.classList.contains('matched'));
                if (matchedCards.length === cards.length) {
                    document.querySelector('.tada').play();
                    document.querySelector('.blocks').style.transform = 'translateY(-120vh)';
                    document.querySelector('.again').style.display = 'block';
                    game.style['margin-top'] = '40vh';
                } else {
                    document.querySelector('.right').play();
                }
                bgBlink({bgColor: '#B2DFDB', blinkColor: '#4caf50', numOfBlinks: 1, blinkDuration: 600});
            } else {
                document.querySelector('.wrong-tries span').textContent++;
                document.querySelector('.wrong').play();
                bgBlink({bgColor: '#B2DFDB', blinkColor: '#e91e63', numOfBlinks: 2, blinkDuration: 200});
            }
        }
    }
})

function shuffle(array) {
    let current = array.length, random, temp;
    while (current) {
        random = Math.floor(Math.random() * array.length);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
}

function flipAll() {
    cards.forEach((card) => {
        card.classList.contains('flipped') ? card.classList.remove('flipped') : card.classList.add('flipped');
    })
}

function bgBlink({bgColor = 'white' ,blinkColor = 'red', numOfBlinks = 1, blinkDuration = 100}) {
        document.querySelector('body').style['background-color'] = blinkColor;
        numOfBlinks *= 2;
        let dur = blinkDuration;
        for (let i = 0; i < numOfBlinks; i++) {
            setTimeout(() => {
                document.querySelector('body').style['background-color'] = i%2 ? bgColor : blinkColor;
            }, dur)
            dur += blinkDuration;
        }
}