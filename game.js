// game consts
let GAME_WIDTH = 480
let GAME_HEIGHT = 576

// phaser game config
let config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

// runtime variables
let isRunning = true;
let score = 0;

// used to load assets before game start up
function preload() {
    this.load.image('background_img', 'assets/background.png');
    this.load.image('stars_img', 'assets/stars.png');
    this.load.image('player_img', 'assets/player.png');
    this.load.image('laserBullet_img', 'assets/laserBullet.png');
    this.load.image('enemy_img', 'assets/enemy.png');
    this.load.image('asteroid_img', 'assets/asteroid.png');
}

// used to create objects on game start up
function create() {

    //background
    background_spr = this.add.sprite(0, 0, 'background_img').setOrigin(0, 0);
    stars_spr = this.add.sprite(0, 0, 'stars_img').setOrigin(0, 0);

    // controls
    moveControls = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // instantiating text
    scoreText = this.add.text(25, GAME_HEIGHT - 50, "SCORE: ", {fontFamily: 'Georgia'});
    scoreText.scale = 1.5;

    // instantiating player
    player_spr = new Player (this, 'player_img');

    // instantiating enemies into a group
    enemyGroup = this.add.group();
    enemyGroup.add(new Enemy(this, GAME_WIDTH/2, 100, 'enemy_img', player_spr));
    enemyGroup.add(new Enemy(this, GAME_WIDTH/4, 100, 'enemy_img', player_spr));
    enemyGroup.add(new Enemy(this, (GAME_WIDTH/4)*3, 100, 'enemy_img', player_spr));

    // creating event listender for collisions
    collisions(this);
}

function collisions(scene) {
    
    // playerBullets x enemies
    scene.physics.add.collider(player_spr.bulletGroup, enemyGroup, function(bullet, enemy){
        bullet.destroy();
        enemy.destroy();
        score += 10;
    });

    // enemy bullets vs player
    let enemy_ary = enemyGroup.getChildren();
    // checking each enemy
    enemy_ary.forEach(function(enemy) {
        // checking all bullets associated with said enemy
        scene.physics.add.collider(player_spr, enemy.bulletGroup, function(player, bullet) {
            bullet.destroy();

            player.setLives(-1);
        });
    });
}

// called each frame
function update() {

    if(isRunning) {
        // moving stars down
        stars_spr.y += 2;
        if (stars_spr.y > 0) {
            stars_spr.y = -GAME_HEIGHT;
        }

        // updating game objects
        player_spr.update();

        // putting enemies into an array so they can be updated
        let enemy_ary = enemyGroup.getChildren();
        enemy_ary.forEach(enemy => {
            enemy.update();
        });

        // updating score text
        scoreText.text = "SCORE: " + score;
    }
}