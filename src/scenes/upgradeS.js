import Player from "../classes/playerC";

export default class UpgradeScene extends Phaser.Scene{

    constructor() {
        super({key:"UpgradeScene"});

        // size
        this.width = 480;
        this.height = 576;

        // text
        this.pointsText;

        // sprites
        this.background_spr;
        this.stars_spr;
        this.player_spr;
    }

    init(data) {
        // player config sent from first or main scene
        this.playerSpeed = data.playerSpeed;
        this.playerFireDelay = data.playerFireDelay;
        this.playerScore = data.playerScore;
    }

    // used to load assets before game start up
    preload() {
        // buttons
        this.load.image('speedIcon_img', 'src/assets/images/speedIcon.png');
        this.load.image('offenceIcon_img', 'src/assets/images/offenceIcon.png');
        this.load.image('nextIcon_img', 'src/assets/images/nextIcon.png');

        // pressed icons
        this.load.image('speedIconPressed_img', 'src/assets/images/speedIconPressed.png');
        this.load.image('offenceIconPressed_img', 'src/assets/images/offenceIconPressed.png');
        this.load.image('nextIconPressed_img', 'src/assets/images/nextIconPressed.png');

        // music
        this.load.audio('upgradeLoop', 'src/assets/audio/ThisGameIsOver.wav');
    }

    // used to create objects on game start up
    create() {

        // background
        this.background_spr = this.add.sprite(0, 0, 'background_img').setOrigin(0, 0);
        this.stars_spr = this.add.sprite(0, 0, 'stars_img').setOrigin(0, 0);

        // music loop
        this.music = this.sound.add('upgradeLoop');
        this.music.play();
        this.music.setLoop(true);

        // text
        this.pointsText = this.add.text(this.width/2 - 65, 100, 'POINTS: ' + this.playerScore, {fontFamily: 'Georgia'});
        this.pointsText.scale = 1.5;
        this.speedCost = this.add.text(50, 200, 'COST: 10', {fontFamily: 'Georgia'});
        this.speedCost.scale = 1.25;
        this.speedText = this.add.text(30, 375, 'SPEED:  ' + this.playerSpeed, {fontFamily: 'Georgia'});
        this.speedText.scale = 1.5;
        this.offenceCost = this.add.text(this.width - 150, 200, 'COST: 20', {fontFamily: 'Georgia'});
        this.offenceCost.scale = 1.25;
        this.offenceText = this.add.text(this.width - 250, 375, 'FIRE DELAY:  ' + this.playerFireDelay + "ms", {fontFamily: 'Georgia'});
        this.offenceText.scale = 1.5;

        // buttons
        this.speedIcon_spr = this.add.sprite(100, 300, 'speedIcon_img').setInteractive();
        this.offenceIcon_spr = this.add.sprite(this.width - 100, 300, 'offenceIcon_img').setInteractive();
        this.nextIcon_spr = this.add.sprite(this.width/2, this.height - 75, 'nextIcon_img').setInteractive();

        // onClick events
        this.speedIcon_spr.on('pointerdown', this.speedIncrease.bind(this));

        this.speedIcon_spr.on('pointerup', function() {
            this.setTexture('speedIcon_img');
        });

        this.offenceIcon_spr.on('pointerdown', this.offenceIncrease.bind(this));

        this.offenceIcon_spr.on('pointerup', function() {
            this.setTexture('offenceIcon_img');
        });

        this.nextIcon_spr.on('pointerdown', this.next.bind(this));

        this.nextIcon_spr.on('pointerup', function() {
            this.setTexture('nextIcon_img');
        });
    }

    update() {
        // update text
        this.pointsText.text = "POINTS: " + this.playerScore;
        this.speedText.text = 'SPEED:  ' + this.playerSpeed;
        this.offenceText.text = 'FIRE DELAY:  ' + this.playerFireDelay + "ms";
    }

    speedIncrease() {

        // check if enough points
        if (this.playerScore >= 10) {

            // sound effect
            this.sound.play('enemyShoot_sfx');

            // change button texture
            this.speedIcon_spr.setTexture('speedIconPressed_img');

            // increase stat
            this.playerSpeed += 10;

            // spend points
            this.playerScore -= 10;
        }
    }

    offenceIncrease() {

        if (this.playerScore >= 20 && this.playerFireDelay > 50) {

            // sound effect
            this.sound.play('enemyShoot_sfx');

            // change button texture
            this.offenceIcon_spr.setTexture('offenceIconPressed_img');

            // increases stat
            this.playerFireDelay -= 10;

            // spend points
            this.playerScore -= 20;
        } 
    }

    next() {

        //stop music
        this.music.stop();

        // open main scene
        this.scene.start("MainScene", {
                playerSpeed: this.playerSpeed,
                playerFireDelay: this.playerFireDelay,
                playerScore: this.playerScore
            }
        );
    }
}