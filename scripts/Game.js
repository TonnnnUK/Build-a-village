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

class Game {
    constructor( GameState ) {
        this.GameState = GameState;
        this.GameState.canvas = document.getElementById('renderCanvas');
        this.GameState.engine = new Engine(GameState.canvas, true, { stencil: true});
        this.GameState.scene = new GameScene(GameState.engine).scene;
        this.GameState.world = new World(GameState);
        this.GameState.colony = new Colony(GameState);
        this.GameState.mouse = new MouseController(GameState);
        this.GameState.camera = new CameraController(GameState);
        this.GameState.gui = new GuiController(GameState);
        this.GameState.selectionController = new SelectionController(GameState);
        this.GameState.keyboardController = new KeyboardController(GameState);
        // Inspector.Show(GameState.scene, {});
    }

    runRenderLoop() {
        this.GameState.engine.runRenderLoop(() => {
            this.GameState.scene.render();
            this.GameState.keyboardController.update();
            this.GameState.colony.updateCitizensHeight();
            this.GameState.colony.updateCitizensState();
            this.GameState.camera.followCam();
            this.GameState.mouse.coordinates();
        });
    }

    updateCitizenAI(){
        this.GameState.colony.handleTasks();
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.GameState.engine.resize();
        });    
    }
    
  }

  export default Game