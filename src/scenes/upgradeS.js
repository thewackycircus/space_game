import Player from "../classes/playerC";

export default class UpgradeScene extends Phaser.Scene{

    constructor() {
        super({key:"UpgradeScene"});

        // size
        this.width = 480;
        this.height = 576;

        // sprites
        this.background_spr;
        this.stars_spr;
        this.player_spr;

        
    }

    init(data) {
        // player config sent from MainScene
        this.player = data.player;
    }

    // used to load assets before game start up
    preload() {
        this.load.image('speedIcon_img', 'src/assets/speedIcon.png');
        this.load.image('offenceIcon_img', 'src/assets/offenceIcon.png');
    }

    // used to create objects on game start up
    create() {
        console.log(this.player);

         //background
         this.background_spr = this.add.sprite(0, 0, 'background_img').setOrigin(0, 0);
         this.stars_spr = this.add.sprite(0, 0, 'stars_img').setOrigin(0, 0);
         this.player_spr = new Player(this, 'player_img');

         //icons
    }

    // called each frame
    update() {
        this.player_spr.update();
    }
}