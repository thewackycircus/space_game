class Bullet extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // config variables
        this.speed = 400;
    }
    update() {

        // move bullet up
        this.body.setVelocity(0, -this.speed);

        // destroy bullets if they have left screen
        if (this.body.y < -10) {

            // must destroy physics object aswell as instance of this class
            this.destroy();
        }
    }
}