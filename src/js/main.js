//

import Game from "class/Game"
import Scene from "class/Scene"
import Figure from "class/Figure"
import Player from "class/Player"
import Trader from "class/Trader"
import Rat from "class/Rat"
import RatQueen from "class/RatQueen"

import "../css/main.styl"

document.addEventListener("DOMContentLoaded", e => {
    const game = new Game(document.querySelector("#mount"))

    const scene = new Scene({
        width: 256,
        height: 256,
        pos: [129,129],
        tiles: [
            ["grass",0,0,200,200],
            ["debug",-1,-1,258,258],
        ],
    })

    const me = new Player({
        pos: [129,129],
        // pos: [3+118+1,8+118+1],
        angle: "e",
        name: "You",
        level: 1,
        hp: [84,100],
    })

    const trader = new Trader({
        pos: [3+118,8+118],
    })

    const ratQ = new RatQueen({
        pos: [12+118,4+118],
        angle: "e",
    })

    const rat1 = new Rat({
        pos: [130,130],
        hp: [4,5],
    })
    const rat2 = new Rat({
        pos: [126,139],
        angle: "e",
    })
    const rat3 = new Rat({
        pos: [117,135],
    })

    const cube = new Figure({
        pos: [123,133],
    })

    game.addScene("Spawn", scene)

    scene.addFigure(1, me)
    scene.addFigure(2, trader)
    scene.addFigure(3, ratQ)
    scene.addFigure(4, rat1)
    scene.addFigure(5, rat2)
    scene.addFigure(6, rat3)
    scene.addFigure(7, cube)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")

    scene.renderAllFigures()
})
