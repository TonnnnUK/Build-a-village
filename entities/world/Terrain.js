import {
    MeshBuilder,
    StandardMaterial,
    Texture,
    Color3
} from '@babylonjs/core';

import { TerrainMaterial } from '@babylonjs/materials';
import { Helpers } from '../../scripts/Helpers';

class Terrain {

    constructor(scene){
        this.scene = scene;
        this.mesh = this.generateTerrain();
    }

    generateTerrain() {
        
        // Create terrain material
        var terrainMaterial = new TerrainMaterial("terrainMaterial", this.scene);
        terrainMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
        terrainMaterial.specularPower = 64;
        
        // Set the mix texture (represents the RGB values)
        terrainMaterial.mixTexture = new Texture("https://assets.babylonjs.com/textures/mixMap.png", this.scene);
        
        // Diffuse textures following the RGB values of the mix map
        // diffuseTexture1: Red
        // diffuseTexture2: Green
        // diffuseTexture3: Blue
        terrainMaterial.diffuseTexture1 = new Texture("../../assets/terrain/rocky/rocky_trail.jpg", this.scene);
        terrainMaterial.diffuseTexture2 = new Texture("https://assets.babylonjs.com/textures/rock.png", this.scene);
        terrainMaterial.diffuseTexture3 = new Texture("https://assets.babylonjs.com/textures/grass.png", this.scene);
        
        // Bump textures according to the previously set diffuse textures
        terrainMaterial.bumpTexture1 = new Texture("../../assets/terrain/rocky/rocky_trailn.png", this.scene);
        terrainMaterial.bumpTexture2 = new Texture("https://assets.babylonjs.com/textures/rockn.png", this.scene);
        terrainMaterial.bumpTexture3 = new Texture("https://assets.babylonjs.com/textures/grassn.png", this.scene);
    
        // Rescale textures according to the terrain
        terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 100;
        terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 50;
        terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 150;
        
        const largeGround = MeshBuilder.CreateGroundFromHeightMap("largeGround", "../../assets/heightmaps/heightmap2.png", 
            {width:1000, height:1000, subdivisions: 50, minHeight:-10, maxHeight: 50});

        largeGround.material = terrainMaterial;
        // const largeGroundMat = new StandardMaterial("largeGroundMat");
        // largeGroundMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/valleygrass.png");
        // largeGroundMat.diffuseTexture.uScale = largeGroundMat.diffuseTexture.vScale =  50;
        // largeGround.material = largeGroundMat; 


        // let factor = 512;
        // let resolution = (2*factor)+1;
        // let multiplier = 1;

        // var noiseArray = Helpers.diamondSquare(resolution, multiplier);


        largeGround.position.y = -0;
        // largeGround.material.wireframe = true;
        return largeGround;
    }

    getHeightAtCoordinates(x, z) {
        const heightMapInfo = this.mesh.getHeightAtCoordinates(x, z);
        return heightMapInfo ? heightMapInfo.height : 0;
    }
      

}

export default Terrain;