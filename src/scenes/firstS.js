import Player from '../classes/playerC'
import Wave from '../classes/waveC'

export default class FirstScene extends Phaser.Scene {

    constructor() {
        super({key: "FirstScene"});

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
        this.load.image('background_img', 'src/assets/images/background.png');
        this.load.image('stars_img', 'src/assets/images/stars.png');
        this.load.image('player_img', 'src/assets/images/player.png');
        this.load.image('laserBullet_img', 'src/assets/images/laserBullet.png');
        this.load.image('enemyBullet_img', 'src/assets/images/enemyBullet.png');
        this.load.image('asteroid_img', 'src/assets/images/asteroid.png');
        this.load.image('enemy_img', 'src/assets/images/enemy.png');
        this.load.spritesheet('enemySpawn_sh', 'src/assets/images/enemySpawn.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('asteroid_sh', 'src/assets/images/asteroidRotation.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.audio('enemyShoot_sfx', 'src/assets/audio/laser4.wav');
        this.load.audio('playerShoot_sfx', 'src/assets/audio/laser7.wav');
        this.load.audio('enemyDeath_sfx', 'src/assets/audio/sfx_explosionnormal.ogg');
        this.load.audio('playerHurt_sfx', 'src/assets/audio/sfx_shocked.ogg');

        this.load.audio('mainLoop', 'src/assets/audio/OrbitalColossus.mp3');
    }

    // used to create objects on game start up
    create() {

        //background
        this.background_spr = this.add.sprite(0, 0, 'background_img').setOrigin(0, 0);
        this.stars_spr = this.add.sprite(0, 0, 'stars_img').setOrigin(0, 0);

        // music loop
        this.music = this.sound.add('mainLoop');
        this.music.play();
        this.music.setLoop(true);

        // instantiating text
        this.scoreText = this.add.text(25, this.height - 50, "SCORE: ", {fontFamily: 'Georgia'});
        this.scoreText.scale = 1.5;
        this.livesText = this.add.text(this.width - 120, this.height - 50, "LIVES: ", {fontFamily: 'Georgia'});
        this.livesText.scale = 1.5;

        // instantiating player
        this.player_spr = new Player (this, this.width/2,  this.height - 100, 'player_img', 400, 200);

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
            //stop music
            this.music.stop();
            
            // opening new scene and passing it the player object
            this.scene.start("UpgradeScene", {
                playerSpeed: this.player_spr.speed,
                playerFireDelay: this.player_spr.fireDelay,
                playerScore: this.score
                }
            );
        }
    }
}