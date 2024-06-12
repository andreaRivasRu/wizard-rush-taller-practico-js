// Crear una variable para almacenar el canva
const canvas = document.querySelector('#game');
// Darle contexto 2d
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

// llamar a la funcion starGame con un addEventListener apenar cargue la pagina
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    // Calcular el tamaño del canvas en función de las dimensiones de la ventana
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    // Establecer el tamaño del canvas
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

    starGame();
}

function starGame() {
    game.font = `${elementsSize}px Verdana`;

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCol = mapRows.map(row => row.trim().split(''));

    // Dibujar los elementos en el canvas
    for (let col = 0; col < 10; col++) {
        for (let row = 1; row < 11; row++) {
            game.fillText(emojis[mapRowsCol[row - 1][col]], elementsSize * col, elementsSize * row);
        }
    }
}