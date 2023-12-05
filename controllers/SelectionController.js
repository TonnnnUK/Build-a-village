import GuiController from "./GuiController";

class SelectionController {

    constructor(GameState){
        this.scene = GameState.scene;
        this.world = GameState.world;
        this.GuiController = GameState.gui;
        this.selectedEntity = this.selectEntity();
    }

    selectEntity(){
        this.scene.onPointerDown = (e) => {
            var hit = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            if( hit && hit.pickedMesh && hit.pickedMesh.entity ){
                hit.pickedMesh.selected = true;
                this.GuiController.showEntityInfo(hit.pickedMesh);
            } else {
                this.GuiController.hideEntityInfo();
            }
        }
    }

}

export default SelectionController