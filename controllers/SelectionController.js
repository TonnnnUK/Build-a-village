import { Color3 } from '@babylonjs/core';
import GuiController from "./GuiController";

class SelectionController {

    constructor(GameState){
        this.scene = GameState.scene;
        this.world = GameState.world;
        this.GuiController = GameState.gui;
        this.selectedEntity = null;
        this.initDefaultSelection();
    }

    initDefaultSelection(){
        this.scene.onPointerDown = (e) => {
            var hit = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            if( hit && hit.pickedMesh && hit.pickedMesh.entity ){
                
                hit.pickedMesh.selected = true;
                this.GuiController.showEntityInfo(hit.pickedMesh);
                
                this.selectedEntity = hit.pickedMesh.entity;
                this.selectedEntity.skin.material.emissiveColor = new Color3(1, 1, 1);
            } else {
                this.GuiController.hideEntityInfo();
                
                if( null != this.selectedEntity){
                    if( this.selectedEntity.isPlayer ){
                        this.selectedEntity.skin.material.emissiveColor = new Color3(0,0,1);
                    } else {
                        this.selectedEntity.skin.material.emissiveColor = new Color3(1,0,0);
                    }
                    this.selectedEntity = null;
                }
            }
        }
    }

}

export default SelectionController