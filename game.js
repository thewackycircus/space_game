import Phaser from 'phaser'
import MainScene from './src/scenes/mainS'
import UpgradeScene from './src/scenes/upgradeS'

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
            debug: true
        }
    },
    scene: [MainScene, UpgradeScene]
};

const game = new Phaser.Game(config);