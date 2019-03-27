//

import Game from "class/Game"
import Scene from "class/Scene"
import Player from "class/Player"
import Trader from "class/Trader"
import Rat from "class/Rat"

import "../css/main.styl"

document.addEventListener("DOMContentLoaded", e => {
    const game = new Game(document.querySelector("#mount"))

    const scene = new Scene({
        width: 22,
        height: 22,
        pos: [10,10],
        debug: true,
    })

    const me = new Player({
        name: "Player",
        level: 1,
        hp: [84,100],
        pos: [10,10],
    })

    const trader = new Trader({
        name: "Trader",
        pos: [3,8],
    })

    const rat1 = new Rat({
        name: "Rat Queen",
        level: 2,
        hp: [5,5],
        pos: [12,4],
    })

    const rat2 = new Rat({
        name: "Rat",
        level: 1,
        hp: [4,5],
        pos: [14,9],
    })

    game.addScene("Spawn", scene)
    scene.addFigure(1, me)
    scene.addFigure(2, trader)
    scene.addFigure(3, rat1)
    scene.addFigure(4, rat2)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")
    scene.renderAllFigures()
})
