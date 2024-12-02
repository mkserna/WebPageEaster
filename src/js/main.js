let score = 0;
let highScore = 0;
let gameInterval;
let isGamePaused = false;

const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highscore');
const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const endButton = document.getElementById('end-button');

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
endButton.addEventListener('click', endGame);

function startGame() {
    score = 0;
    scoreElement.innerText = score;
    isGamePaused = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
    endButton.disabled = false;
    pauseButton.innerText = 'Pausar Juego';
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        if (!isGamePaused) {
            createEgg();
        }
    }, 1500);
}

function pauseGame() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
        pauseButton.innerText = 'Reanudar Juego';
    } else {
        pauseButton.innerText = 'Pausar Juego';
    }
}

function endGame() {
    clearInterval(gameInterval);
    if (score > highScore) {
        highScore = score;
        highScoreElement.innerText = highScore;
    }
    startButton.disabled = false;
    pauseButton.disabled = true;
    endButton.disabled = true;
    pauseButton.innerText = 'Pausar Juego'; // Asegúrate de que el texto se restablezca
    gameArea.innerHTML = ''; // Limpiar los huevos restantes
}

function createEgg() {
    const egg = document.createElement('div');
    egg.classList.add('egg');
    egg.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
    egg.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;

    egg.addEventListener('click', () => {
        score++;
        scoreElement.innerText = score;
        egg.remove();
    });

    gameArea.appendChild(egg);

    setTimeout(() => {
        if (egg.parentElement) {
            egg.remove();
        }
    }, 1000);
}
