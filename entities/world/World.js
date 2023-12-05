import { MeshBuilder, Texture, Color3, Vector2, Mesh,  } from '@babylonjs/core';
import { WaterMaterial } from '@babylonjs/materials';

import Sky from "./Sky";
import Terrain from "./Terrain";
import Water from './Water';

class World {

    constructor(GameState){
        this.scene = GameState.scene;
        this.terrain = new Terrain(this.scene);
        this.sky = new Sky(this.scene);
        this.water = new Water(this.scene, this.terrain, this.sky);
    }

}

export default World;