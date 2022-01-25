import Bullet from "./bulletC";

export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        // direction variables
        this.dir = -1; // -1 = left, 0 = still, 1 = right
        this.changeDirTime = 0;
        this.dirChangeDelay = 500;

        // firing variables
        this.bulletGroup = scene.add.group();
        this.nextBulletTime = 0;
        this.fireDelay = 600;

        //config variables
        this.points = 10;

        //anims
        this.anims.create({
            key: 'enemySpawn',
            frames: this.anims.generateFrameNumbers('enemySpawn_sh', {
                start: 0,
                end: 11
            }),
            frameRate: 15,
            repeat: 0
        });

        this.init();
    }

    init() {
        this.anims.play('enemySpawn');
    }

    update() {

        this.move();
        this.fire();

        // putting bullets into an array so they can be updated
        let bullet_ary = this.bulletGroup.getChildren();
        bullet_ary.forEach(bullet => {
            bullet.update();
        });
    }

    move() {
        // check what direction to move in
        if (this.dir === -1) {
            this.body.setVelocity(-200, 0);
        } else if (this.dir === 1) {
            this.body.setVelocity(200, 0)
        }

        // if enough time has passed
        if (this.scene.time.now > this.changeDirTime) {

            // changing direction
            this.dir *= -1;

            //resetting changeDirTime to hold delay between bullets firing
            this.changeDirTime = this.scene.time.now + this.dirChangeDelay;
        }
    }
    
    fire() {

        // if enough time has passed
        if (this.scene.time.now > this.nextBulletTime) {
            // initializing new bullet
            this.bulletGroup.add(new Bullet(this.scene, this.body.x + this.width/2, this.body.y, 'enemyBullet_img', 400));
            this.scene.sound.play('enemyShoot_sfx');

            //resetting nextbulletTime to hold delay between bullets firing
            this.nextBulletTime = this.scene.time.now + this.fireDelay;
        }
    }
}