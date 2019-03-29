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
        pos: [129,129],
        width: 256,
        height: 256,
        tiles: [
            ["grass",0,0,200,200],
            ["debug",-1,-1,258,258],
        ],
    })

    const me = new Player({
        pos: [129,129],
        name: "You",
        level: 1,
        hp: [84,100],
        angle: "e",
    })

    const trader = new Trader({
        pos: [3+118,8+118],
    })

    const rat = new Rat({
        pos: [130,130],
        hp: [4,5],
    })
    const rat2 = new Rat({
        pos: [124,137],
    })

    const ratQ = new RatQueen({
        pos: [12+118,4+118],
        angle: "e",
    })

    game.addScene("Spawn", scene)
    scene.addFigure(1, me)
    scene.addFigure(2, trader)
    scene.addFigure(3, ratQ)
    scene.addFigure(4, rat)
    scene.addFigure(5, rat2)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")
    scene.renderAllFigures()
})
