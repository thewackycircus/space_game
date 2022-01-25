import Phaser from 'phaser'
import FirstScene from './src/scenes/firstS'
import UpgradeScene from './src/scenes/upgradeS'
import MainScene from './src/scenes/mainS'

// game consts
let GAME_WIDTH = 480;
let GAME_HEIGHT = 576;

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
    scene: [FirstScene, UpgradeScene, MainScene]
};

const game = new Phaser.Game(config);