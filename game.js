// Crear una variable para almacenar el canva
const canvas = document.querySelector('#game');

// Darle contexto 2d
const game = canvas.getContext('2d');

// llamar a la funcion starGame con un addEventListener apenar cargue la pagina
window.addEventListener('load', starGame)

// Crear una funcion para inicializar el juego
function starGame() {

    game.fillText('Platzi', 10, 10)
}