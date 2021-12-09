class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, 0, 0, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.init();
    }

    init() {
        this.setPosition(GAME_WIDTH / 2, 100);
    }
}