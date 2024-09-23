// Global variables
const gameContainer = document.querySelector('.game-container');
const welcomeGame = document.querySelector('.welcome-game');
const loseFinalScreen = document.querySelector('.lose-game');
const winFinalScreen = document.querySelector('.win-game');
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const btnStart = document.querySelector('#start');
const livesSpan = document.querySelector('#lives');
const timeSpan = document.querySelector('#time');
const recordSpan = document.querySelector('#record');
const timeResume = document.querySelector('#time-resume');
const recordResume = document.querySelector('#record-resume');
// const pResult = document.querySelector('#result');
const resultGame = document.querySelector('#result-game');
const winEmojiSpan = document.querySelector('#win-emoji');
const loseEmojiSpan = document.querySelector('#lose-emoji');

let canvasSize;
let elementsSize;
let lvl = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

let deadPosition = {};

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let bombPositions = [];

btnStart.addEventListener('click', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// Functions
function setCanvasSize() {
  windowWidth = window.innerWidth * 0.8;
  windowHeight = window.innerHeight * 0.7;
  
  if (window.innerHeight > window.innerWidth) {
    if ((windowWidth % 10) !== 0) {
      canvasSize = Math.ceil(windowWidth / 10) * 10;
    } else {
      canvasSize = windowWidth;
    }
  } else {
    if ((windowHeight % 10) !== 0) {
      canvasSize = Math.ceil(windowHeight / 10) * 10;
    } else {
      canvasSize = windowHeight;
    }
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  gameContainer.classList.remove('inactive');
  welcomeGame.classList.add('inactive');
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[lvl];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 1000);
    showRecord();
  }

  //renderizar mapa
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  
  showLives();

  bombPositions = [];
  clearMap();

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        }
      } else if (col === 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === 'X') {
        bombPositions.push({
            x: posX,
            y: posY
        })
      }
      
      game.fillText(emoji, posX, posY);
    });
  });
  
  movePlayer();
}

function clearMap() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}

function formatTime(ms) {
  // convertir los milisegundos a segundos y minutos
  const seg = parseInt(ms/1000) % 60;
  const min = parseInt(ms/60000) % 60;

  // asegurarse que los seg y min tengan 2 digitos siempre, rellenando los espacios con 0
  const segStr = `${seg}`.padStart(2, '0');
  const minStr = `${min}`.padStart(2, '0');

  // retornar el tiempo con formato 00:00
  return `${minStr}:${segStr}`;
}

function showLives() {
  livesSpan.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
  timeSpan.innerHTML = formatTime(Date.now() - timeStart);
}

function showRecord() {
  recordSpan.innerHTML = localStorage.getItem('record_time');
}

function movePlayer() {
  const giftCollisionX = playerPosition.x == giftPosition.x;
  const giftCollisionY = playerPosition.y == giftPosition.y;
  const giftCollision = giftCollisionX && giftCollisionY;
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

  if (giftCollision) {
    showMessageInCanvas(`Well done, you leveled up! 🥳`);
    setTimeout(lvlUp, 2000);
  }

  const enemyCollision = bombPositions.find(enemy => {
    const enemyCollisionX = enemy.x == playerPosition.x;
    const enemyCollisionY = enemy.y == playerPosition.y;
    return enemyCollisionX && enemyCollisionY;
  })

  if (enemyCollision) {
    showMessageInCanvas(`You hit a log 😰, you have ${lives} lives left.`);
    setTimeout(resetLvl, 3000);
  }
}

function lvlUp() {
    lvl++;
    // pResult.innerHTML = 'Well done, you leveled up!';
    startGame();
};

function resetLvl() {
    lives--;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    
    // pResult.innerHTML = `You hit a bomb, you have ${lives} lives left.`

    if (lives <= 0) {
        lvl = 0;
        lives = 3;
        clearInterval(timeInterval);
        timeStart = undefined;
        loseFinalScreen.classList.remove('inactive');
        gameContainer.classList.add('inactive');
        loseEmojiSpan.innerHTML = `${emojis['GAME_OVER']}`;
        return;
    }
    
    startGame();
};

function showMessageInCanvas(message) {
  const fontSize = elementsSize / 3;
  game.globalAlpha = 0.8;
  game.fillStyle = 'black';
  game.fillRect(0, 0, canvas.width, canvas.height);

  game.globalAlpha = 1.0;
  game.fillStyle = 'white';
  game.font = fontSize + 'px Courier Prime';
  game.textAlign = 'center';
  game.fillText(message, canvasSize / 2, canvasSize / 2);
}

function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(timeInterval);
    winFinalScreen.classList.remove('inactive');
    gameContainer.classList.add('inactive');
    winEmojiSpan.innerHTML = `${emojis['WIN']}`;

    const recordTime = localStorage.getItem('record_time');
    timePlayer = formatTime(Date.now() - timeStart);
    console.log(timePlayer);
    
    
    if (recordTime) {
      if (recordTime > timePlayer) {
        localStorage.setItem('record_time', timePlayer);
        resultGame.innerHTML = `New record: ${timePlayer}`;
      } else {
        resultGame.innerHTML = `You didn't beat your record`;
      }
    } else {
      localStorage.setItem('record_time', timePlayer);
      resultGame.innerHTML = `Record: ${timePlayer}`;
    }
    timeResume.innerHTML = `${timePlayer}`;
    recordResume.innerHTML = `${recordTime}`;
};

function reload() {
  location.reload();
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
window.addEventListener('keydown', startGameByKey);

function startGameByKey(event) {
  if(!welcomeGame.classList.contains('inactive')) {
    if (event.code === 'Enter' || event.code === 'Space') {
      btnStart.click();
    }   
  };
  console.log(event);
}
function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');

  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}