class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, 0, 0, texture);

        // initialise
        this.init();

        // firing variables
        this.bulletGroup = scene.add.group();
        this.nextBulletTime = 0;
        this.fireDelay = 200;
    }

    init() {
        
        // creating a physics object for the player
        this.obj = this.scene.physics.add.image(GAME_WIDTH/2, GAME_HEIGHT - 100, this.texture);
        this.obj.setCollideWorldBounds(true);
    }

    update() {

        // movement
        if (moveControls.left.isDown) {
            this.obj.body.setVelocity(-400, 0);
        } else if (moveControls.right.isDown){
            this.obj.body.setVelocity(400, 0);
        } else {
            this.obj.body.setVelocity(0, 0);
        }

        // fire
        if (fireButton.isDown) {
            this.fire(this.bulletGroup);
        }

        // putting bullets into an arrya so i can update them
        let bullet_ary = this.bulletGroup.getChildren();
        bullet_ary.forEach(bullet => {
            bullet.update();
        });
    }

    fire(bulletGroup) {

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {
            // initializing new bullet
            bulletGroup.add(new Bullet(this.scene, this.obj.body.x + this.width/2, this.obj.body.y, 'laserBullet_img'));

            //resetting nextbulletTime to hold delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}