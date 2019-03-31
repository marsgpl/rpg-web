//

import {evl} from "lib/helper"

import DataLayer from "class/DataLayer"
import GUI from "gui/GUI"
import ModelLoader from "class/ModelLoader"
import Game from "class/Game"
import Scene from "class/Scene"
import Figure from "class/Figure"
import Player from "class/Player"
import Trader from "class/npc/Trader"
import Rat from "class/mob/Rat"
import RatQueen from "class/mob/RatQueen"

import Helm from "class/item/Helm"
import Sword from "class/item/Sword"
import Jacket from "class/item/Jacket"
import Boots from "class/item/Boots"
import Bands from "class/item/Bands"
import Pants from "class/item/Pants"
import Shirt from "class/item/Shirt"
import Vest from "class/item/Vest"
import Shield from "class/item/Shield"
import ShieldRound from "class/item/ShieldRound"
import Crown from "class/item/Crown"

import "../css/main.styl"

evl(document, "DOMContentLoaded", e => {
    const data = {
        currentPlayer: {
            inventory: {
                size: 12,
                items: [
                    {  },
                    {  },
                    {  },
                    {  },
                    { equip: "Helm", model: "Helm" },
                ],
            },
            equipment: {
                Helm: {
                    equip: "Helm",
                    // model: "Helm",
                    // style: {
                    //     _front: { fill: "red" },
                    //     _stripe: { fill: "gray" },
                    //     _bird: { fill: "white" },
                    // },
                    model: "Crown",
                },
                Shirt: {
                    equip: "Shirt",
                    model: "Shirt",
                    // style: {
                    //     _front: { fill: "#fff" },
                    //     _back: { fill: "#eee" },
                    //     _string: { stroke: "black" },
                    // },
                },
                Vest: {
                    equip: "Vest",
                    // model: "Vest",
                    // style: {
                    //     _front: { fill: "red" },
                    //     _back: { fill: "yellow" },
                    //     _belt: { fill: "black" },
                    //     _buckle: { stroke: "white" },
                    // },
                    model: "Jacket",
                },
                Sword: {
                    equip: "Sword",
                    model: "Sword",
                    // style: {
                    //     _handle: { fill: "red" },
                    // },
                },
                Shield: {
                    equip: "Shield",
                    // model: "Shield",
                    // style: {
                    //     _front: { fill: "red", stroke: "white" },
                    //     _stripes: { fill: "red", stroke: "white" },
                    //     _stripe: { stroke: "white" },
                    // },
                    model: "ShieldRound",
                    // style: {
                    //     _front: { fill: "red", stroke: "white" },
                    //     _center: { fill: "white", stroke: "gray" },
                    // },
                },
                Ring: null,
                Pants: {
                    equip: "Pants",
                    model: "Pants",
                    // style: {
                    //     _front: { fill: "#fff" },
                    //     _back: { fill: "#eee" },
                    // },
                    style: {
                        _front: { fill: "#eee" },
                        _back: { fill: "#ddd" },
                    },
                },
                Bands: {
                    equip: "Bands",
                    model: "Bands",
                    style: {
                        _front: { fill: "#ddd" },
                        _front2: { fill: "#ddd" },
                        _back: { fill: "#888" },
                    },
                },
                Boots: {
                    equip: "Boots",
                    model: "Boots",
                    style: {
                        _front: { fill: "#888" },
                        _back: { fill: "#aaa" },
                    },
                },
            }
        }
    }

    const dataLayer = new DataLayer(data)

    const modelLoader = new ModelLoader

    const gui = new GUI(document.querySelector("#gui"), dataLayer, modelLoader)

    dataLayer.bindGui(gui)

    gui.addAction("Chat")
    gui.addAction("Inventory")
    gui.addAction("Equipment")
    gui.addAction("Stats")

    gui.showAction("Stats")
    gui.showModal("Equipment")
    gui.showModal("Inventory")
    gui.showAction("Chat")

    const game = new Game(document.querySelector("#mount"), dataLayer, modelLoader)

    dataLayer.bindGame(game)

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
    // const he = new Player({
    //     pos: [scene.pos[0]+1, scene.pos[1]+1],
    //     angle: "n",
    //     name: "Noob",
    //     level: 1,
    // })

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
        model: "Lol",
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
        pos: [52,57],
    })
    const vest = new Vest({
        pos: [52,59],
    })
    const shield = new Shield({
        pos: [52,61],
    })
    const shieldRound = new ShieldRound({
        pos: [52,63],
    })
    const crown = new Crown({
        pos: [52,65],
    })

    game.addScene("Spawn", scene)

    let id = 1

    scene.addFigure(id++, me)
    // scene.addFigure(id++, he)
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
    scene.addFigure(id++, shieldRound)
    scene.addFigure(id++, crown)

    scene.setCurrentPlayer(1)

    game.renderScene("Spawn")

    scene.renderAllFigures()
})
