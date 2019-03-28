//

import Game from "class/Game"
import Scene from "class/Scene"
import Player from "class/Player"
import Trader from "class/Trader"
import Rat from "class/Rat"
import RatQueen from "class/RatQueen"

import "../css/main.styl"

document.addEventListener("DOMContentLoaded", e => {
    const game = new Game(document.querySelector("#mount"))

    const scene = new Scene({
        width: 22,
        height: 22,
        pos: [10,10],
        tiles: [
            ["grass",0,0,16,16],
            ["debug",-1,-1,24,24],
        ],
    })

    const me = new Player({
        name: "Player Killer",
        level: 1,
        hp: [84,100],
        pos: [10,10],
    })

    const trader = new Trader({
        name: "Trader",
        pos: [3,8],
        angle: 1,
    })

    const rat = new Rat({
        hp: [4,5],
        pos: [14,9],
    })

    const ratQ = new RatQueen({
        hp: [1,15],
        pos: [12,4],
        angle: 1,
    })

    game.addScene("Spawn", scene)
    scene.addFigure(1, me)
    scene.addFigure(2, trader)
    scene.addFigure(3, rat)
    scene.addFigure(4, ratQ)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")
    scene.renderAllFigures()
})
