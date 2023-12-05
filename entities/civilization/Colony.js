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
        console.log('colony', this);
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

    updateCitizensState(){
        let player = this.getPlayer();
        player.updateCitizensState();
    }

    updateCitizensHeight(){
        this.citizens.forEach((citizen) => {
            citizen.updateCitizenHeight()
        });
    }

}

export default Colony