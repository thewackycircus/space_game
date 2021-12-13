class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    update() {
        // debug
        console.log("enemyUpdate");
    }
}