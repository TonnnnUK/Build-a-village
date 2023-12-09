import { MeshBuilder, Ray, Vector3 } from "@babylonjs/core";
import Citizen from "./Citizen";

class Colony {

    constructor(GameState){
        this.GameState = GameState;
        this.scene = GameState.scene;
        this.world = GameState.world;
        this.name = 'New Colony';
        this.citizens = [];
        this.spawnPlayer();
        this.spawnColony();
    }

    spawnPlayer(){
        const citizen = new Citizen(this, true);  
        this.citizens.push(citizen);      
    }

    spawnColony(){

        for(let i = 0; i<5; i++){
            const citizen = new Citizen(this);
            this.citizens.push(citizen);
        }
    }

    getPlayer() {
        return this.citizens.find(citizen => citizen.isPlayer === true);
    }

    handleTasks(){

        console.log('handling tasks');
        
        // Loop through orders
        
        // Assign relevant citizen a task
        
        // Test - place tree, find tree, assign citizen, walk to tree
        if( this.GameState.world.trees.length > 0 ){
            let coords = this.GameState.world.trees[0].mesh.position;

            let citizen = this.citizens[3];

            citizen.mesh.lookAt(coords, Math.PI);

            citizen.target = coords;
            citizen.currentState = 'walking';
            
        }



    }

    updateCitizensState(){
        this.citizens.forEach((citizen) => {
            citizen.updateCitizensState();
        });
    }

    updateCitizensHeight(){
        this.citizens.forEach((citizen) => {
            citizen.updateCitizenHeight()
        });
    }

}

export default Colony