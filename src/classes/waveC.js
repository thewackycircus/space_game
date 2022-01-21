import Spawner from './spawnerC'

export default class Wave extends Phaser.GameObjects.Sprite{

    constructor (scene) {
        super(scene, 0, 0)

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
        this.spawnerGroup.add(new Spawner(this.scene, this.scene.width/4, 100, 'enemy', 4000, 3));
        this.spawnerGroup.add(new Spawner(this.scene, (this.scene.width/4)*3, 100, 'enemy', 4000, 3));
        this.spawnerGroup.add(new Spawner(this.scene, this.scene.width/2, 0, 'asteroid', 3000, 5));
    }

    update() {

        // putting spawners into an array so they can be updated
        let spawner_ary = this.spawnerGroup.getChildren();
        spawner_ary.forEach(spawner => {
            spawner.update();
        });

        if (this.spawnerGroup.getLength() < 1) {
            this.scene.isRunning = false;
        }
    }
}