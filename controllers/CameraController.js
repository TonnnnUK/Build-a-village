import {
    UniversalCamera,
    FreeCamera, 
    ArcRotateCamera,
    Vector3,
    Axis,
} from '@babylonjs/core';

class CameraController {

    constructor(GameState) {
        this.scene = GameState.scene;
        this.canvas = GameState.canvas;
        this.colony = GameState.colony;
        this.cameraType = 'universal';
        this.playerCam = this.setupPlayerCamera()
        this.universalCam = this.setupUniversalCamera();
        this.setCamera();
    }

    setCamera(){
        if (this.cameraType === 'universal') {
            if( this.camera ){
                this.universalCam.position = this.camera.position;
                this.camera.position.y += 15;
                this.camera.position.x += 25;
                this.camera.target = this.colony.getPlayer().mesh.position;
            }
            
            this.scene.activeCamera = this.universalCam;
            this.camera = this.universalCam;
        } else {
            if( this.camera ){
                this.playerCam.position = this.camera.position;
            }
            this.scene.activeCamera = this.playerCam;
            this.camera = this.playerCam
        }
    }

    setupUniversalCamera(){
        // Create Universal Camera and start position
        let camera = new UniversalCamera("universalCamera", new Vector3(100, 50, -110), this.scene);
        camera.rotation = new Vector3(0.5, -44.75, 0);
        
        // Set camera controls
        camera.attachControl(this.canvas, true);
        camera.inputs.attached.mouse.buttons = [1,2];
        camera.inputs.addMouseWheel();
        camera.wheelPrecision = 0.00; //Mouse wheel speed;
        camera.speed = 3;
        camera.lowerRadiusLimit = 5;
        camera.upperRadiusLimit = 1;

        // Camera wheel zoom - on or off?
        // camera.inputs._mouseWheelInput.wheelPrecisionY = 0;

        return camera;
    }

    setupPlayerCamera(){
        // Creates, angles, distances and targets the camera
        let player = this.colony.getPlayer();    
        let camera = new ArcRotateCamera("playerCamera", 0, 0, 10, player.position, this.scene);

        // This positions the camera
        camera.setPosition(new Vector3(0, 4, 20));

        // // This attaches the camera to the canvas
        camera.attachControl(this.canvas, true);
        camera.lowerBetaLimit = 1.116;
        camera.lowerRadiusLimit = 3;
        camera.upperBetaLimit = 1.4275;
        camera.upperRadiusLimit = 20;
        camera.speed = .5;

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(this.canvas, true);

        return camera;
    }

    followCam(){

        if( this.cameraType != 'player' ){ return; } 

        let player = this.colony.getPlayer();
        this.camera.position.copyFrom(player.mesh.position.subtract(player.mesh.forward.scale(5)).add(new Vector3(0,1.6,0)))
        this.camera.setTarget(player.mesh.position)
    }

    setupCollisions(){
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true; 
        this.camera.collisionMask = 1; // Set collision mask for the camera
        this.camera.collisionGroup = 2; // Set collision group for the ground mesh
        this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // Adjust the ellipsoid size as needed

    }

}

export default CameraController