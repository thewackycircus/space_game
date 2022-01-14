class Spawner extends Phaser.GameObjects.Sprite{

    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);

        // making spawner invisible
        this.visible = false;

        // adding this to scene
        this.scene.add.existing(this);

        // enemy Spawning variables
        this.enemyGroup = scene.add.group();
        this.nextEnemyTime = 0;
        this.spawnDelay = 3000;
    }

    // called regularly from game.js update()
    update() {

        this.spawn();
        this.collisions();

        // putting enemies into an array so they can be updated
        let enemy_ary = this.enemyGroup.getChildren();
        enemy_ary.forEach(enemy => {
            enemy.update();
        });
    }

    spawn() {
        // if enough time has passed
        if (this.scene.time.now > this.nextEnemyTime) {
            // initializing new enemy
            this.enemyGroup.add(new Enemy(this.scene, this.x, this.y, this.texture));

            // updating nextEnemyTime to maintain delay between spawning
            this.nextEnemyTime = this.scene.time.now + this.spawnDelay;
        }
    }

    collisions() {
    
        // playerBullets vs enemies
        this.scene.physics.add.collider(player_spr.bulletGroup, this.enemyGroup, function(bullet, enemy){
            bullet.destroy();
            enemy.destroy();
            score += enemy.getScore();
        });
    
        // checking each enemy
        let enemy_ary = this.enemyGroup.getChildren();
        enemy_ary.forEach(function(enemy) {
            // enemy bullets vs player
            enemy.scene.physics.add.collider(player_spr, enemy.bulletGroup, function(player, bullet) {
                bullet.destroy();
                player.setLives(-1);
            });
    
            // checking if enemy has hit player
            enemy.scene.physics.add.collider(player_spr, enemy, function(player, enemy){
                enemy.destroy();
                player.setLives(-1);
            })
        });
    }
}