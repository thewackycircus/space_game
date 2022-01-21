import Player from '../classes/playerC'
import Wave from '../classes/waveC'

export default class MainScene extends Phaser.Scene {

    constructor() {
        super({key: "MainScene"});

        // size
        this.width = 480;
        this.height = 576;

        // runtime variables
        this.isRunning = true;
        this.score = 0;

        // sprites
        this.background_spr;
        this.stars_spr;
        this.player_spr;

        // classes
        this.wave;

        // text
        this.scoreText;
        this.livesText;
    }

    // used to load assets before game start up
    preload() {
        this.load.image('background_img', 'src/assets/background.png');
        this.load.image('stars_img', 'src/assets/stars.png');
        this.load.image('player_img', 'src/assets/player.png');
        this.load.image('laserBullet_img', 'src/assets/laserBullet.png');
        this.load.image('enemyBullet_img', 'src/assets/enemyBullet.png');
        this.load.image('asteroid_img', 'src/assets/asteroid.png');
        this.load.image('enemy_img', 'src/assets/enemy.png');
        this.load.spritesheet('enemySpawn_sh', 'src/assets/enemySpawn.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('asteroid_sh', 'src/assets/asteroidRotation.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    // used to create objects on game start up
    create() {

        //background
        this.background_spr = this.add.sprite(0, 0, 'background_img').setOrigin(0, 0);
        this.stars_spr = this.add.sprite(0, 0, 'stars_img').setOrigin(0, 0);

        // instantiating text
        this.scoreText = this.add.text(25, this.height - 50, "SCORE: ", {fontFamily: 'Georgia'});
        this.scoreText.scale = 1.5;
        this.livesText = this.add.text(this.width - 120, this.height - 50, "LIVES: ", {fontFamily: 'Georgia'});
        this.livesText.scale = 1.5;

        // instantiating player
        this.player_spr = new Player(this, 'player_img');

        // instantiating wave
        
        this.wave = new Wave(this);
    }

    // called each frame
    update() {

        if(this.isRunning) {
            // moving stars down
            this.stars_spr.y += 2;
            if (this.stars_spr.y > 0) {
                this.stars_spr.y = -this.height;
            }

            // updating wave
            this.wave.update();

            // updating game objects
            this.player_spr.update();

            // updating score text
            this.scoreText.text = "SCORE: " + this.score;
            this.livesText.text = "LIVES: " + this.player_spr.lives;
        }

        else {
            this.scene.start("UpgradeScene");
        }
    }
}