import { MeshBuilder, Texture, Color3, Vector2, Mesh,  } from '@babylonjs/core';
import { WaterMaterial } from '@babylonjs/materials';

class Water {

    constructor(scene, terrain, sky){
        this.scene = scene;
        this.terrain = terrain;
        this.sky = sky;
        this.mesh = this.addWater();
    }

    addWater() {
        const waterMesh = MeshBuilder.CreateGround('waterMesh', { width: 2060, height: 2060, subdivisions: 50 }, this.scene);
        const waterMaterial = new WaterMaterial('waterMaterial', this.scene);
        waterMaterial.backFaceCulling = true;
        waterMaterial.bumpTexture = new Texture('../assets/waterbump.png', this.scene);
        waterMaterial.windForce = -5;
        waterMaterial.waveHeight = 0.3;
        waterMaterial.bumpHeight = 0.15;
        waterMaterial.windDirection = new Vector2(1, 1);
        waterMaterial.waterColor = new Color3(0, 0.1, 0);
        waterMaterial.colorBlendFactor = 0.8;
        waterMaterial.addToRenderList(this.terrain.mesh);
        waterMaterial.addToRenderList(this.sky.skyBox);
        
        waterMesh.material = waterMaterial;
        waterMesh.position.y = 1; // Adjust the height of the water surface

        return waterMesh;
    }
}

export default Water