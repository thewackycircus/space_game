import Bullet from "./bulletC";

export default class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, speed, fireDelay) {
        super(scene, x, y, texture, speed, fireDelay);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        // firing variables
        this.bulletGroup = this.scene.add.group();
        this.nextBulletTime = 0;

        // controls
        this.moveControls = this.scene.input.keyboard.createCursorKeys();
        this.fireButton = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // config variables
        this.lives = 3;
        this.speed = speed;
        this.fireDelay = fireDelay;
    }

    update() {

        // movement
        if (this.moveControls.left.isDown) {
            this.body.setVelocity(-this.speed, 0);
        } else if (this.moveControls.right.isDown) {
            this.body.setVelocity(this.speed, 0);
        } else {
            this.body.setVelocity(0, 0);
        }

        // fire
        if (this.fireButton.isDown) {
            this.fire(this.bulletGroup);
        }

        // putting bullets into an array so they can be updated
        let bullet_ary = this.bulletGroup.getChildren();
        bullet_ary.forEach(bullet => {
            bullet.update();
        });

        // check to see if player is alive
        if(this.lives <= 0) {
            this.scene.isRunning = false;
            this.destroy();
        }
    }

    fire(bulletGroup) {

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {

            // initializing new bullet
            bulletGroup.add(new Bullet(this.scene, this.body.x + this.width/2, this.body.y, 'laserBullet_img', -400));
            this.scene.sound.play('playerShoot_sfx');

            //resetting nextbulletTime to hold delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}