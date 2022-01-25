export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, speed) {
        super(scene, x, y, texture);

        // deconstruction
        this.speed = speed;

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    update() {

        // move bullet
        this.body.setVelocity(0, this.speed);

        // destroy bullets if they have left screen
        if (this.body.y < -10 || this.body.y > this.scene.height) {
            this.destroy();
        }
    }
}