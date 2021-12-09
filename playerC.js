class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, texture) {
        super(scene, 0, 0, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.init();
    }

    init() {
        this.setPosition(GAME_WIDTH / 2, GAME_HEIGHT - 100);
    }

    update() {

        // player move left and right
        if (moveControls.left.isDown) {
            // left wall collission
            if (this.x > 0 + this.width/2) {
                this.x -= 4;
            }
        } 
        if (moveControls.right.isDown) {
            // right wall collission
            if (this.x < GAME_WIDTH - this.width/2) {
                this.x += 4;
            }
        }
    }
}