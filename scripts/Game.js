import {
    Engine
} from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';
import CameraController from '../controllers/CameraController';
import Colony from '../entities/civilization/Colony';
import SelectionController from '../controllers/SelectionController';
import GuiController from '../controllers/GuiController';
import World from '../entities/world/World';
import GameScene from '../entities/scenes/GameScene';
import KeyboardController from '../controllers/KeyboardController';
import MouseController from '../controllers/MouseController';
import { GameState } from './GameState';

class Game {
    constructor() {
        GameState.canvas = document.getElementById('renderCanvas');
        GameState.engine = new Engine(GameState.canvas);

        GameState.scene = new GameScene(GameState.engine).scene;
        GameState.world = new World(GameState);
        GameState.colony = new Colony(GameState);
        GameState.mouse = new MouseController(GameState);
        GameState.camera = new CameraController(GameState);
        GameState.gui = new GuiController(GameState);
        GameState.selectionController = new SelectionController(GameState);
        GameState.keyboardController = new KeyboardController(GameState);
        Inspector.Show(GameState.scene, {});
    }

    runRenderLoop() {
        GameState.engine.runRenderLoop(() => {
            GameState.scene.render();
            GameState.keyboardController.update();
            GameState.colony.updateCitizensHeight();
            GameState.colony.updateCitizensState();
            GameState.camera.followCam();
            GameState.mouse.coordinates();
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            GameState.engine.resize();
        });    
    }
    
  }

  export default Game