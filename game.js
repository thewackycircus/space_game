// game consts
let GAME_WIDTH = 400
let GAME_HEIGHT = 500

// phaser game config
let config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

// PHASER FUNCTIONS

// used to load assets before game start up
function preload() {
    this.load.image('background_img', 'assets/gameBg.png');
    this.load.image('player_img', 'assets/player.png');
    this.load.image('laserBullet_img', 'assets/laserBullet.png');
    this.load.image('enemy_img', 'assets/enemy.png');
    this.load.image('asteroid_img', 'assets/asteroid.png');
}

// used to create objects on game start up
function create() {
    background_spr = this.add.sprite(0, -GAME_HEIGHT, 'background_img').setOrigin(0, 0);

    // controls
    moveControls = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // instantiating enemies into a group
    enemyGroup = this.add.group();
    enemyGroup.add(new Enemy(this, GAME_WIDTH/2, 100, 'enemy_img'));
    enemyGroup.add(new Enemy(this, GAME_WIDTH/3, 100, 'enemy_img'));

    // instantiating player
    player_spr = new Player (this, 'player_img');

    // creating event listender for collissions
    this.physics.add.collider(player_spr.bulletGroup, enemyGroup, function(bullet, enemy){
        bullet.destroy();
        enemy.destroy();
    });
}

// called each frame
function update() {
    // updating all updatable game object
    player_spr.update();
}