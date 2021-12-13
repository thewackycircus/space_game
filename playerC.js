class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, GAME_WIDTH/2, GAME_HEIGHT - 100, texture);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        // firing variables
        this.bulletGroup = scene.add.group();
        this.nextBulletTime = 0;
        this.fireDelay = 200;
    }

    update() {

        // movement
        if (moveControls.left.isDown) {
            this.body.setVelocity(-400, 0);
        } else if (moveControls.right.isDown) {
            this.body.setVelocity(400, 0);
        } else {
            this.body.setVelocity(0, 0);
        }

        // fire
        if (fireButton.isDown) {
            this.fire(this.bulletGroup);
        }

        // putting bullets into an array so they can be updated
        let bullet_ary = this.bulletGroup.getChildren();
        bullet_ary.forEach(bullet => {
            bullet.update();
        });
    }

    fire(bulletGroup) {

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {

            // initializing new bullet
            bulletGroup.add(new Bullet(this.scene, this.body.x + this.width/2, this.body.y, 'laserBullet_img', -400));

            //resetting nextbulletTime to hold delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}