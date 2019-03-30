//

import Game from "class/Game"
import Scene from "class/Scene"
import Figure from "class/Figure"

import Player from "class/Player"

import Helm from "class/item/Helm"
import Sword from "class/item/Sword"
import Jacket from "class/item/Jacket"
import Boots from "class/item/Boots"
import Bands from "class/item/Bands"
import Pants from "class/item/Pants"
import Shirt from "class/item/Shirt"
import Vest from "class/item/Vest"
import Shield from "class/item/Shield"

import Trader from "class/npc/Trader"

import Rat from "class/mob/Rat"
import RatQueen from "class/mob/RatQueen"

import "../css/main.styl"

document.addEventListener("DOMContentLoaded", e => {
    const game = new Game(document.querySelector("#mount"))

    const scene = new Scene({
        width: 128,
        height: 128,
        pos: [64,64],
        tiles: [
            ["grass",0,0,128,128],
            ["stone",56,56,12,12],
            ["debug",-1,-1,130,130],
        ],
    })

    const me = new Player({
        pos: scene.pos,
        angle: "se",
        name: "You",
        level: 1,
        hp: [84,100],
    })

    const trader = new Trader({
        pos: [58,59],
    })

    const ratQ = new RatQueen({
        pos: [72,62],
        angle: "w",
    })

    const rat1 = new Rat({
        pos: [65,70],
        angle: "e",
        hp: [4,5],
    })
    const rat2 = new Rat({
        pos: [51,77],
        angle: "w",
    })
    const rat3 = new Rat({
        pos: [67,52],
        angle: "e",
    })

    const cube = new Figure({
        pos: [65,57],
    })

    const helm = new Helm({
        pos: [54,56],
    })
    const sword = new Sword({
        pos: [54,58],
    })
    const jacket = new Jacket({
        pos: [54,60],
    })
    const boots = new Boots({
        pos: [54,62],
    })
    const bands = new Bands({
        pos: [54,64],
    })
    const pants = new Pants({
        pos: [54,66],
    })
    const shirt = new Shirt({
        pos: [54,68],
    })
    const vest = new Vest({
        pos: [54,70],
    })
    const shield = new Shield({
        pos: [54,72],
    })

    game.addScene("Spawn", scene)

    let id = 1

    scene.addFigure(id++, me)
    scene.addFigure(id++, trader)
    scene.addFigure(id++, ratQ)
    scene.addFigure(id++, rat1)
    scene.addFigure(id++, rat2)
    scene.addFigure(id++, rat3)
    scene.addFigure(id++, cube)
    scene.addFigure(id++, helm)
    scene.addFigure(id++, sword)
    scene.addFigure(id++, jacket)
    scene.addFigure(id++, boots)
    scene.addFigure(id++, bands)
    scene.addFigure(id++, pants)
    scene.addFigure(id++, shirt)
    scene.addFigure(id++, vest)
    scene.addFigure(id++, shield)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")

    scene.renderAllFigures()
})
