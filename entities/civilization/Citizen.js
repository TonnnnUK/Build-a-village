import { Vector3, Ray, SceneLoader, Color3, StandardMaterial } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import Name from '../../controllers/NameController';
import { Roles } from '../../dictionaries/roles';
import { Helpers } from '../../scripts/Helpers';

class Citizen {

    constructor(colony, isPlayer = false){
        this.GameState = colony.GameState;
        this.colony = colony;
        this.id = Helpers.generateUniqueID();
        this.isPlayer = isPlayer;
        this.gender = this.selectGender();
        this.name = this.generateName();
        this.mesh;
        this.skin;
        this.age;
        this.health;
        this.currentRole = this.createRole();
        this.currentPosition; // player coordinates on map
        this.currentState = 'idle';
        this.target = null;
        this.currentAnimation;
        this.generateModel();
        this.keybaordController = this.colony.scene
    }

    selectGender(){
        // Generate a random number between 0 and 1
        const randomValue = Math.random();

        // Check if the random value is less than 0.5004
        if (randomValue < 0.5004) {
            return 'male';
        } else {
            return 'female';
        }

    }

    generateName(){
        let name = new Name();
        return name.generate(this.gender);
    }

    createRole(){
        let role;
        if( this.isPlayer ){
            role = 'Leader';
        } else {
            const randomIndex = Math.floor(Math.random() * Roles.length);
            role = Roles[randomIndex];
        }

        return role;
    }

    generateModel(){
        
        this.model = SceneLoader.ImportMesh("", "../../models/citizens/", "citizen.gltf", this.colony.scene, (meshes, particles, skeletons, animations) => {
            this.animations = animations;
            let animation = this.playAnimation('Standing idle');
            let mesh = meshes[0];
            this.mesh = mesh;
            // this.mesh.rotationQuaternion = null;
            
            this.skin = meshes[1];
            this.skin.entity = this;

            this.skin.material = new StandardMaterial("humanSkin", this.GameState.world.scene);

            if( this.isPlayer ){
                this.skin.material.emissiveColor = new Color3(0, 0, 1);
            } else {
                this.skin.material.emissiveColor = new Color3(1, 0, 0);
            }

            let vec3 = null;
            if( this.isPlayer ) {
                vec3 = new Vector3(100, 0, -100);
                this.GameState.camera.cameraType = 'player';
                this.GameState.camera.setCamera();
            } else {
                const randomNumberX = Math.floor(Math.random() * (30 - 3 + 1)) + 3;
                const randomNumberZ = Math.floor(Math.random() * (30 - 3 + 1)) + 3;
                vec3 = new Vector3(100+randomNumberX, 0, -100-randomNumberZ);
            }
            this.mesh.position = vec3;
            

        });

    }

    // getRandomCoordinates(){
    //     const randX = Math.floor(Math.random() * 50);
    //     const randZ = Math.floor(Math.random() * 50);
    //     const height = this.colony.world.terrain.mesh.getHeightAtCoordinates(randX, randZ);

    //     return new Vector3(randX, height, randZ)
    // }

    checkInWater(){ // Todo
        if (this.skin.intersectsMesh(this.GameState.world.water.mesh)){
            console.log('is in water')
            return true;
        } else {
            console.log('not in water');
            return false;
        }
    }

    updateCitizensState(){

        
        if (this.GameState.camera.cameraType === 'player') {
            if( this.isPlayer ) {
                let isMoving = false
                if (this.GameState.keyboardController.keys.w == true ||
                    this.GameState.keyboardController.keys.q == true ||
                    this.GameState.keyboardController.keys.e == true ) {
                        isMoving = true;
                    }
        
                if (isMoving) {
                    // Play walking animation
    
                    if (this.currentAnimation?.name !== 'Walking') {
                        this.playAnimation('Walking');
                    }
                } else {
                    // Play idle animation only if not already playing
                    if (this.currentAnimation?.name !== 'Standing idle') {
                        this.playAnimation('Standing idle');
                    }
                }
            }
        }

        if ( this.currentState == 'walking' ){

            if( Math.abs(this.mesh.position.y - this.target.y) <= 2 &&
                Math.abs(this.mesh.position.x - this.target.x) <= 2 &&
                Math.abs(this.mesh.position.z - this.target.z) <= 2
            ){
                if (this.currentAnimation?.name !== 'Standing idle') {
                    this.playAnimation('Standing idle');
                }
                this.currentState = 'idle';
            } else {
                if(this.currentAnimation?.name !== 'Walking') {
                    this.playAnimation('Walking');
                }
                this.mesh.position.addInPlace(this.mesh.forward.scaleInPlace(0.065));
            }
        }

    }

    updateCitizenHeight(){
        if( this.mesh ){
            var ray = new Ray(new Vector3(this.mesh.position.x, 100, this.mesh.position.z), new Vector3(0, -1, 0));
            var pickInfo = this.GameState.scene.pickWithRay(ray, (mesh) =>  {
                // Check if the mesh is the ground
                return mesh === this.colony.world.terrain.mesh;
            });
            if (pickInfo.hit) {
                var groundHeight = pickInfo.pickedPoint.y;
                this.mesh.position.y = groundHeight; // Adjust the height of the character
            }
        }
    }
    
    findAnimation(name){
        if( this.animations ){
            for (let i = 0; i < this.animations.length; i++) {
                if (this.animations[i].name === name) {
                    this.currentAnimation = this.animations[i];
                    return this.animations[i];
                }
            }
        }
        // Return null if the animation with the specified name is not found
        return null;
    }

    playAnimation(name) {
        let animation = this.findAnimation(name);

        if (animation) {

            // Stop any currently playing animations
            if (this.currentAnimation) {
                this.currentAnimation.stop();
            }
    
            // Play the new animation
            animation.play(true);
    
            // Update the current animation
            this.currentAnimation = animation;
        }

    }

}

export default Citizen