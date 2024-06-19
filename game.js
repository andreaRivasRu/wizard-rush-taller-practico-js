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