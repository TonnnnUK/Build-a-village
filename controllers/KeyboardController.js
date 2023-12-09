import {
    Vector3,
    Axis,
} from '@babylonjs/core';

import { Inspector } from '@babylonjs/inspector';

class KeyboardController {

    constructor(GameState){
        this.scene = GameState.scene;
        this.cameraController = GameState.camera;
        this.player = GameState.colony.getPlayer();
        this.keys = {};
        this.setupKeys();
        this.prevTime = performance.now();
        this.showInspector = false;
    }

    handleInspector(){
        this.showInspector = !this.showInspector
        if( this.showInspector){
            Inspector.Show(this.scene, {});
        } else {
            Inspector.Hide(this.scene, {});
        }
    }

    setupKeys(){
        // console.log(this.cameraController);
        
        this.keys = { w: false, a: false, s: false, d: false, q: false, e: false, space: false };

        window.addEventListener('keydown', (event) => {
            this.handleKeyDown(event.key);

            // Show / Hide inspector for debugging
            if( event.key == 'i'){
                this.handleInspector();
            }
        });
        
        window.addEventListener('keyup', (event) => {
            this.handleKeyUp(event.key);
        });

    }

    handleKeyDown(key) {

        if(key == ' '){
            this.keys.space = true;
        }

        if (key in this.keys) {
          this.keys[key] = true;
        }
    }

    handleKeyUp(key) {
        if(key == ' '){
            this.keys.space = false;
        }

        if (key in this.keys) {
            this.keys[key] = false;
        }
    }

    update(){

        let time = performance.now();
        // Create a delta value based on current time
        let delta = ( time - this.prevTime ) / 1000;

        if( this.cameraController.cameraType == 'universal'){
        
            const moveDirection = new Vector3(0, 0, 0);

            if (this.keys.w) {
                this.cameraController.camera.position.addInPlace(this.cameraController.camera.getDirection(Axis.Z).scaleInPlace(1.25));
            }
            if (this.keys.s) {
                this.cameraController.camera.position.addInPlace(this.cameraController.camera.getDirection(Axis.Z).scaleInPlace(-1.25));
            }
            if (this.keys.a) {
                this.cameraController.camera.position.addInPlace(this.cameraController.camera.getDirection(Axis.X).scaleInPlace(-1.25));
            }
            if (this.keys.d) {
                this.cameraController.camera.position.addInPlace(this.cameraController.camera.getDirection(Axis.X).scaleInPlace(1.25));
            }

            if (this.keys.q) {
                this.cameraController.camera.rotation.y -= 0.03; // Adjust the rotation speed as needed
            }
            if (this.keys.e) {
                this.cameraController.camera.rotation.y += 0.03; // Adjust the rotation speed as needed
            }

            // Update the camera position
            this.cameraController.camera.position.addInPlace(moveDirection);

            if (this.cameraController.camera.position.y < 1) {
                this.cameraController.camera.position.y = 1;
            }
            if (this.cameraController.camera.position.y > 100) {
                this.cameraController.camera.position.y = 100;
            }

            if (this.cameraController.camera.position.x < -450) {
                this.cameraController.camera.position.x = -450;
            }
            if (this.cameraController.camera.position.x > 450) {
                this.cameraController.camera.position.x = 450;
            }

            if (this.cameraController.camera.position.z < -450) {
                this.cameraController.camera.position.z = -450;
            }
            if (this.cameraController.camera.position.z > 450) {
                this.cameraController.camera.position.z = 450;
            }
        } 
        
        if (this.cameraController.cameraType == 'player'){
            if (this.keys.w) {
                this.player.mesh.position.addInPlace(this.player.mesh.forward.scaleInPlace(0.1));
            }

            if (this.keys.s) {
                this.player.mesh.position.subtractInPlace(this.player.mesh.forward.scaleInPlace(0.1));
            }
            
            // if (this.keys.d) {
            //     this.player.mesh.position.x += .1;
            // }
            // if (this.keys.a) {
            //     this.player.mesh.position.x -= .1;
            // }
            
            if (this.keys.e) {
                // Rotate the player to the right
                this.player.mesh.rotation.y += 0.05;
            }
            if (this.keys.q) {
                // Rotate the player to the left
                this.player.mesh.rotation.y -= 0.05;
            }

            this.cameraController.camera.target = this.player.mesh.position;
            
        }
    }



}

export default KeyboardController