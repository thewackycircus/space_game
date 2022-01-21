export default class Icon extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, type) {
        super (scene, x, y, texture, type);

        // adding this to scene and physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    update() {
        // playerBullets vs icons
        this.scene.physics.add.collider(this.scene.player_spr.bulletGroup, this, (bullet) => {
            bullet.destroy();
            
            this.scene.score += enemy.points;
            this.destroy();
        });
    }
}