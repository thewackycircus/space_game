class Bullet extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // initialise
        this.init();

        // config variables
        this.speed = 400;
    }

    init() {

        // creating a physics object for the bullet
        this.obj = this.scene.physics.add.image(this.x, this.y, this.texture);
    }

    update() { 

        // move bullet up
        this.obj.body.setVelocity(0, -this.speed);

        // destroy bullets if they have left screen
        if (this.obj.body.y < -10) {

            // must destroy physics object aswell as instance of this class
            this.obj.destroy();
            this.destroy();
        }
    }
}