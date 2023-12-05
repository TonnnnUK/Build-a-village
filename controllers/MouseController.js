class MouseController{

    constructor(GameState){
        this.scene = GameState.scene;
        this.mouseX;
        this.mouseY;
    }

    coordinates(){
        this.mouseX = this.scene.pointerX;
        this.mouseY = this.scene.pointerY;
    }

}

export default MouseController;