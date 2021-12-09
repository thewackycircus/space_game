class Bullet extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
    }

    update() { 
        // move bullet up
        this.y -= 5;

        // destroy bullets if they have left screen
        if (this.y < - 10) {
            this.destroy();
        }
    }
}