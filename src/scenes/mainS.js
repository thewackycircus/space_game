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

    init(data) {
        // player config sent from upgrade scene
        this.playerSpeed = data.playerSpeed;
        this.playerFireDelay = data.playerFireDelay;
        this.score = data.playerScore;
    }

    // used to create objects on game start up
    create() {

        // resetting
        this.isRunning = true;

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

        // instantiating wave
        this.wave = new Wave(this);

        // instantiating player
        this.player_spr = new Player (
            this, 
            this.width/2,  
            this.height - 100, 'player_img', 
            this.playerSpeed, 
            this.playerFireDelay
        );
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

            // stopping music
            this.music.stop();

            // opening new scene and passing it the player object
            this.scene.start("UpgradeScene", {
                playerSpeed: this.playerSpeed,
                playerFireDelay: this.playerFireDelay,
                playerScore: this.score
                }
            );
        }
    }
}