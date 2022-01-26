import Asteroid from './asteroidC';
import Enemy from './enemyC';

export default class Spawner extends Phaser.GameObjects.Sprite{

    constructor (scene, x, y, enemyType, spawnDelay, maxEnemies) {
        super(scene, x, y, enemyType, spawnDelay, maxEnemies);

        // making spawner invisible
        this.visible = false;

        // adding this to scene
        this.scene.add.existing(this);

        // group to store enemies in
        this.enemyGroup = scene.add.group();

        // enemy Spawning variables
        this.nextEnemyTime = 0;
        this.spawnDelay = spawnDelay;
        this.enemyType = enemyType;
        this.maxEnemies = maxEnemies;
        this.noEnemies = 1;
    }

    // called regularly from game.js update()
    update() {

        // putting enemies into an array so they can be updated
        let enemy_ary = this.enemyGroup.getChildren();
        enemy_ary.forEach(enemy => {
            enemy.update();
        });

        this.collisions();
        this.spawn();
    }

    spawn() {
        // if max enemies has not yet been hit
        if (this.noEnemies <= this.maxEnemies) {
            // if enough time has passed
            if (this.scene.time.now > this.nextEnemyTime) {
                // initializing new enemy

                switch (this.enemyType) {
                    case "enemy":
                        this.enemyGroup.add(new Enemy(this.scene, this.x, this.y, 'enemy_img'));
                        this.noEnemies += 1;
                        break;
                    case "asteroid":
                        this.enemyGroup.add(new Asteroid(this.scene, this.x, this.y, 'asteroid_img'));
                        this.noEnemies += 1;
                        break;
                }

                // updating nextEnemyTime to maintain delay between spawning
                this.nextEnemyTime = this.scene.time.now + this.spawnDelay;
            }
        } else if (this.enemyGroup.getLength() < 1) {
            this.destroy();
        }
    }

    collisions() {
    
        // playerBullets vs enemies
        this.scene.physics.add.collider(this.scene.player_spr.bulletGroup, this.enemyGroup, (bullet, enemy) => {

            // destroying involved game objects
            bullet.destroy();
            enemy.destroy();

            // playing sound
            this.scene.sound.play('enemyDeath_sfx');

            // adding points
            this.scene.score += enemy.points;
        });

        // checking each enemy
        let enemy_ary = this.enemyGroup.getChildren();
        enemy_ary.forEach(function(enemy) {

            // enemy bullets vs player
            enemy.scene.physics.add.collider(enemy.scene.player_spr, enemy.bulletGroup, (player, bullet) => {

                // destroying bullet
                bullet.destroy();

                // updating player lives
                player.lives -= 1;

                //playing sound
                player.scene.sound.play('playerHurt_sfx');
            });
    
            // checking if enemy has hit player
            enemy.scene.physics.add.collider(enemy.scene.player_spr, enemy, (player, enemy) => {

                // destroying enemy
                enemy.destroy();

                // updating player lives
                player.lives -= 1;

                // playing sound
                player.scene.sound.play('playerHurt_sfx');
            });
        });
    }
}