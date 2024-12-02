document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const emojis = ['🥚', '🐰', '🌷', '🌼', '🐣', '🥕', '🍫', '🐤'];
    let cards = [...emojis, ...emojis];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let timeLeft = 60;
    let timer;

    highScoreElement.innerText = highScore;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createCard(emoji) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const front = document.createElement('div');
        front.className = 'front';
        front.innerText = emoji;
        
        const back = document.createElement('div');
        back.className = 'back';
        back.innerText = '❓';
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', () => {
            if (lockBoard || card === firstCard) return;
            card.classList.add('flip');
            
            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;
                
                if (firstCard.querySelector('.front').innerText === secondCard.querySelector('.front').innerText) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    updateScore();
                    resetBoard();
                    checkWin();
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                    }, 1000);
                }
            }
        });

        return card;
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function updateScore() {
        score++;
        scoreElement.innerText = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem('highScore', highScore);
        }
    }

    function checkWin() {
        const matchedCards = document.querySelectorAll('.card.matched');
        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            setTimeout(() => {
                alert('¡Felicidades! ¡Has ganado!');
                resetGame();
            }, 500);
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                alert('¡Se acabó el tiempo! Has perdido.');
                resetGame();
            }
        }, 1000);
    }

    function resetGame() {
        gameBoard.innerHTML = '';
        score = 0;
        scoreElement.innerText = score;
        timeLeft = 60;
        timerElement.innerText = timeLeft;
        startButton.style.display = 'block';
    }

    function initGame() {
        shuffle(cards);
        cards.forEach(emoji => {
            const card = createCard(emoji);
            gameBoard.appendChild(card);
        });
        startTimer();
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        initGame();
    });

    resetGame(); // Inicializar el tablero limpio al cargar la página
});
