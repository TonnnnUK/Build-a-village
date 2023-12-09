import { StandardMaterial, Texture, Color3, Vector3 } from "@babylonjs/core";
import treeGenerator from '../../generators/treeGenerator';

class Tree {


    constructor(GameState){
        this.GameState = GameState;
        this.scene = GameState.scene;
        this.location;
        this.placed = false;
        this.mesh = this.generateTree();
        this.placeTree();
    }

    
    generateTree(){

        //leaf material
        var green = new StandardMaterial("green", this.scene);
        green.diffuseColor = new Color3(0,1,0);	
        
        //trunk and branch material
        var bark = new StandardMaterial("bark", this.scene);
        bark.emissiveTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", this.scene);
        bark.diffuseTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", this.scene);
        bark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
        bark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes		
                    
        //Tree parameters			
        var trunk_height = 20;
        var trunk_taper = 0.6;
        var trunk_slices = 5;
        var boughs = 2; // 1 or 2
        var forks = 4;
        var fork_angle = Math.PI/4;
        var fork_ratio = 2/(1+Math.sqrt(5)); //PHI the golden ratio
        var branch_angle = Math.PI/3;
        var bow_freq = 2;
        var bow_height = 3.5;
        var branches = 10;
        var leaves_on_branch = 5;
        var leaf_wh_ratio = 0.5;
                    
        var tree = treeGenerator.createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, this.scene);				               
        tree.position.y = -10;
        tree.scaling = new Vector3(0.3,0.3,0.3);
        return tree;
    }

    placeTree(){
        this.intervalId = setInterval(() => {
            this.pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            this.mesh.position = this.pick.pickedPoint;
            this.mesh.position.y += 0.5

            this.mesh.isPickable = !this.placed;

            if (!this.placed) {
                this.scene.onPointerDown = (e) => {
                    if ( e.inputIndex == 2 ){ // if mouse left click
                        this.location = this.mesh.position;
                        this.placed = true;
                        this.isPickable = true;
                        clearInterval(this.intervalId);
                        this.mesh.entity = this;
                        this.GameState.selectionController.initDefaultSelection();
                        this.GameState.world.trees.push(this);
                    }
                }
            }


            
        }, 50);
    }
			
}

export default Tree;