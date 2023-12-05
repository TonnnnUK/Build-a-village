import Buttons from "./ui/Buttons";
import Game from "./scripts/Game";
import { GameState } from "./scripts/GameState";
// Constants
const canvas = document.getElementById("renderCanvas");
const welcomeScreen = document.getElementById("welcomeScreen");

// js Setup
const buttons = new Buttons ;

// Game Logic
buttons.new_game.addEventListener("click", startNewGame);
// Add event listeners for other buttons

function startNewGame() {

    const game = new Game(GameState);
    game.runRenderLoop();
    game.handleResize();

    welcomeScreen.style.display = 'none';
    canvas.classList.remove('hidden');

    // setInterval(() =>{
    //     console.log('current GameState', GameState);
    // }, 8000)

}


buttons.new_game.click();