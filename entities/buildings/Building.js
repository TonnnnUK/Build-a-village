import { MeshBuilder, StandardMaterial, Color3, Vector3 } from "@babylonjs/core";
import { Helpers } from "../../scripts/Helpers";

class Building {

    constructor(world, type){
        this.world = world;
        this.id = Helpers.generateUniqueID();
        this.type = type;
        this.placed = false;
        this.stage = null;
        this.placeBuilding();
    }


    placeBuilding(){
        // generate box mesh
        // console.log(this.world.scene.cameras);
        // this.world.scene.cameras[0].inputs.attached.pointers.buttons = [1,2]
        // this.world.scene.cameras[1].inputs.attached.mouse.buttons = [1,2]

        let building = MeshBuilder.CreateBox('building'+this.id, { size: 10, height: 0.1, width: 10}, this.world.scene);
        let buildingMaterial = new StandardMaterial("playerMaterial", this.world.scene);
        buildingMaterial.diffuseColor = Color3.Gray();
        building.material = buildingMaterial;

        this.intervalId = setInterval(() => {
            this.pick = this.world.scene.pick(this.world.scene.pointerX, this.world.scene.pointerY);

            if ( this.pick.pickedMesh.name != building.name){
                building.position = this.pick.pickedPoint;
                building.position.y += 0.5
            }


            // Update isPickable based on the entity's placement status
            building.isPickable = !this.placed;

            // Check for pointer events only if the entity is not placed
            if (!this.placed) {
                this.world.scene.onPointerDown = (e) => {
                    if (e.inputIndex == 2) { // if mouse left click
                        this.location = building.position;
                        this.placed = true;
                        building.isPickable = true;
                        clearInterval(this.intervalId);
                    }
                };
            }
            
        }, 50);


    }


}

export default Building