class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, 0, 0, texture);

        // initialise
        this.init();
    }

    init() {

        // creating a physics object for the enemy
        this.obj = this.scene.physics.add.image(GAME_WIDTH / 2, 100, this.texture);
    }

    update() {
        console.log("enemyUpdate");
    }
}