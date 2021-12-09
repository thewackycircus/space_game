class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, 0, 0, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.init();

        this.scene = scene;

        // firing variables
        this.bulletGroup = scene.add.group();
        this.nextBulletTime = 0;
        this.fireDelay = 200;
    }

    init() {
        this.setPosition(GAME_WIDTH / 2, GAME_HEIGHT - 100);
    }

    update() {

        this.movement();

        // putting bullets into an arrya so i can update them
        let bullet_ary = this.bulletGroup.getChildren();
        bullet_ary.forEach(bullet => {
            bullet.update();
        });
    }

    movement() {
        // player move left and right
        if (moveControls.left.isDown) {
            // left wall collission
            if (this.x > 0 + this.width/2) {
                this.x -= 4;
            }
        } 
        if (moveControls.right.isDown) {
            // right wall collission
            if (this.x < GAME_WIDTH - this.width/2) {
                this.x += 4;
            }
        }
        if (fireButton.isDown) {
            this.fire(this.bulletGroup);
        }
    }

    fire(bulletGroup) {
        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {
            // initializing new bullet
            bulletGroup.add(new Bullet(this.scene, this.x, this.y - this.height/2, 'laserBullet_img'));

            //resetting nextbulletTime to hold delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}