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

    // Dibujar los elementos en el canvas
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z < 11; z++) {
            game.fillText(emojis['X'], elementsSize * i, elementsSize * z);
        }
    }
}