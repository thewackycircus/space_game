class Wave extends Phaser.GameObjects.Sprite{

    constructor (scene, texture) {
        super(scene, 0, 0, texture)

        // wave does not need to be visible
        this.visible = false;

        // adding this to scene
        this.scene.add.existing(this);

        // group to store spawners in
        this.spawnerGroup = scene.add.group();

        this.init();
    }

    init() {

        // instantiating enemySpawner
        console.log("test");
        this.spawnerGroup.add(new Spawner(this.scene, GAME_WIDTH/4, 100, 'enemy'));
        this.spawnerGroup.add(new Spawner(this.scene, (GAME_WIDTH/4)*3, 100, 'enemy'));
        this.spawnerGroup.add(new Spawner(this.scene, GAME_WIDTH/2, 0, 'asteroid'));
    }

    update() {

        // putting spawners into an array so they can be updated
        let spawner_ary = this.spawnerGroup.getChildren();
        spawner_ary.forEach(spawner => {
            spawner.update();
        });
    }
}