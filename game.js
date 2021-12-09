// game consts
let GAME_WIDTH = 400
let GAME_HEIGHT = 500

// phaser game config
let config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

// PHASER FUNCTIONS

function preload() {
    this.load.image('background_img', 'assets/gameBg.png');
    this.load.image('player_img', 'assets/player.png');
    this.load.image('enemy_img', 'assets/enemy.png');
    this.load.image('asteroid_img', 'assets/asteroid.png');
}

function create() {
    background_spr = this.add.sprite(0, -GAME_HEIGHT, 'background_img').setOrigin(0, 0);
    //player_spr = this.add.sprite(GAME_WIDTH/2, GAME_HEIGHT-100, 'player_img').setOrigin(0.5, 0.5);
    //enemy_spr = this.add.sprite(GAME_WIDTH/2, 100, 'enemy_img').setOrigin(0.5, 0.5);
    //asteroid_spr = this.add.sprite(GAME_WIDTH/2, 100, 'asteroid_img').setOrigin(0.5, 0.5);

    player_spr = new Player (this, 'player_img');
    enemy_spr = new Enemy (this, 'enemy_img');
}