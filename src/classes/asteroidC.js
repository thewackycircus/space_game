class Asteroid extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //config variables
        this.points = 5;

        //anims
        this.anims.create({
            key: 'asteroid',
            frames: this.anims.generateFrameNumbers('asteroid_sh', {
                start: 0,
                end: 7
            }),
            frameRate: 15,
            repeat: -1
        });

        // initialisation
        this.init();
    }

    init() {
        this.anims.play('asteroid')

        // move downwards
        this.body.setVelocity(0, 200);
    }

    update() {
        // destroy this if it has left screen
        if (this.body.y > this.scene.height) {
            this.destroy();
        }
    }
}

export default Asteroid