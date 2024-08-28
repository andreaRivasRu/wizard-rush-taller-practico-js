const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesCounter = document.querySelector('.lives');
const timeCounter = document.querySelector('.time');

let canvasSize;
let elementsSize;
let lvl = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[lvl];

  if (!map) {
    gameWin();
    return;
  }

  timeCounter.innerHTML = '00:00';

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 1000)
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({map, mapRows, mapRowCols}); 
  
  enemyPositions = [];
  game.clearRect(0,0,canvasSize, canvasSize);

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
        enemyPositions.push({
            x: posX,
            y: posY
        })
      }
      
      game.fillText(emoji, posX, posY);
    });
  });
  showLives();
  movePlayer();
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
  livesCounter.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
  timeCounter.innerHTML = formatTime(Date.now() - timeStart);
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftCollision = giftCollisionX && giftCollisionY;
  
  if (giftCollision) {
    lvlUp();
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
    return enemyCollisionX && enemyCollisionY;
  })

  if (enemyCollision) {
    resetLvl();
  }
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function lvlUp() {
    console.log('Subiste de nivel!');
    lvl++;
    startGame();
};

function resetLvl() {
    lives--;
    console.log(lives);
    
    if (lives === 0) {
        lvl = 0;
        lives = 3;
        timeStart = undefined;
    }
    
    console.log(`Chocaste con un enemigo!`);
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
};

function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(timeInterval);
};

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

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