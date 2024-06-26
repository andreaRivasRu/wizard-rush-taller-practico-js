// Mandar llamar elementos del html
const buttonUp = document.getElementById('up');
const buttonLeft = document.getElementById('left');
const buttonRight = document.getElementById('right');
const buttonDown = document.getElementById('down');
// Crear una variable para almacenar el canva
const canvas = document.querySelector('#game');

// Darle contexto 2d
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

// Functions move character
const move = (key) => {
    return() => {
        console.log(`Pressed: ${key}`);
    }
}

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            move('up')();
            break;
        case 'ArrowLeft':
            move('left')();
            break;
        case 'ArrowRight':
            move('right')();
            break;
        case 'ArrowDown':
            move('down')();
            break;
        default:
            console.log('error: No valid key selected');
            break;
    }
}

// llamar a la funcion starGame con un addEventListener apenar cargue la pagina
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
buttonUp.addEventListener('click', move('up'));
buttonLeft.addEventListener('click', move('left'));
buttonRight.addEventListener('click', move('right'));
buttonDown.addEventListener('click', move('down'));
window.addEventListener('keydown', moveByKeys);




function setCanvasSize() {
    // Calcular el tamaño del canvas en función de las dimensiones de la ventana
    window.innerHeight > window.innerWidth 
    ? canvasSize = window.innerWidth * 0.8 
    : canvasSize = window.innerHeight * 0.7;
    
    // Establecer el tamaño del canvas
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

    starGame();
}

function starGame() {
    game.font = `${elementsSize}px Verdana`;

    // Crear arreglos bidimensionales 
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsColumn = mapRows.map(row => row.trim().split(''));

    // Renderizar el mapa
    mapRowsColumn.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const emoji = emojis[column];
            const positionX = elementsSize * columnIndex;
            const positionY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, positionX, positionY);
        })
    });
}