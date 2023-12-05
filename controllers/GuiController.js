import { Color3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock, StackPanel, Button, Control } from '@babylonjs/gui'; 
import Building from '../entities/buildings/Building';

class GuiController {

    constructor(GameState){
        this.GameState = GameState;
        this.scene = GameState.scene;
        this.cameraController = GameState.camera;
        this.world = GameState.world;
        this.colony = GameState.colony;
        this.ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.setupGameMenu();
    }

    async setupGameMenu(){

        this.ui.idealWidth = 1600;
        this.ui.renderAtIdealSize = false;
        
        this.menu = await this.ui.parseFromURLAsync("../gui/json/guiTexture2.json");

        let cameraToggleBtn = this.ui.getControlByName('toggleCamBtn');
        let playerButton = this.ui.getControlByName('playerBtn');
        let colonyButton = this.ui.getControlByName('colonyBtn');
        let buildButton = this.ui.getControlByName('buildBtn');

        cameraToggleBtn.onPointerUpObservable.add( () => {
            if( this.cameraController.cameraType == 'universal' ){
                this.cameraController.cameraType = 'player';
                this.cameraController.setCamera();
            } else {
                this.cameraController.cameraType = 'universal';
                this.cameraController.setCamera();
            }
        });

        playerButton.onPointerUpObservable.add( () => {
            let playerInfo = this.ui.getControlByName('playerInfo');
            playerInfo.isVisible = !playerInfo.isVisible;
        });

        buildButton.onPointerUpObservable.add( () => {
            let building = new Building(this.GameState, 'House');
        });

    }

    createMenuButton(text) {
        const button = Button.CreateSimpleButton("button", text);
        button.fontSize = '12px'
        button.width = "120px";
        button.height = "100%";
        button.color = "White";
        button.thickness = 0;
        button.background = "DarkRed";
        button.margin = "0 3px 0 0";
        return button;
    }

    showInfoPanel(option) {
        // Implement the logic to show the corresponding info panel based on the selected option
        // Create a rectangle or other GUI controls to display the information
        // You can add text blocks, buttons, etc.
        const infoPanel = new Rectangle();
        infoPanel.width = 0.8;
        infoPanel.height = "200px";
        infoPanel.color = "White";
        infoPanel.thickness = 2;
        infoPanel.background = "DarkSlateGray";
        this.ui.addControl(infoPanel);

        const infoText = new TextBlock();
        infoText.text = `Information for ${option}`;
        infoText.color = "White";
        infoText.fontSize = 24;
        infoPanel.addControl(infoText);

        // Add more controls to the infoPanel as needed
    }

    hideEntityInfo() {
        // Remove the existing GUI rectangle if any
        if (this.entityInfo) {
            this.entityInfo.dispose();
            this.entityInfo = null;
        }
    }

    showEntityInfo(selectedMesh){
        this.hideEntityInfo();
        const entityType = selectedMesh.entity.constructor.name;

        this.entityInfo = new Rectangle();
        this.entityInfo.width = 0.2;
        this.entityInfo.height = "40px";
        this.entityInfo.cornerRadius = 0;
        this.entityInfo.color = "White";
        this.entityInfo.thickness = 2;
        this.entityInfo.background = "Red";
        this.ui.addControl(this.entityInfo);

        // Switch statement for different entity data
        switch (entityType) {
            case 'Citizen':
                // console.log('Citizen selected', selectedMesh.entity);
                var label = new TextBlock();
                label.text = selectedMesh.entity.name;
                this.entityInfo.addControl(label);
                break;
            default:
                console.log('Unknown');
        }

        this.entityInfo.linkWithMesh(selectedMesh);   
        this.entityInfo.linkOffsetY = -70;        
    }

}

export default GuiController