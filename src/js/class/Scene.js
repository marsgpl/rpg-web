//

import {
    compose as mxCompose,
    rotateDEG as mxRotate,
    skewDEG as mxSkew,
    applyToPoint as mxApplyToPoint,
    inverse as mxInverse,
} from "transformation-matrix"

import {div} from "lib/helper"

const WIDTH = 11
const HEIGHT = 11
const POS = [5,5]
const TILES = [
    ["debug",-1,-1,13,13],
]

const TILE_W = 32 // px
const TILE_H = 32 // px

export default class {
    constructor(props = {}) {
        this.width = props.width || WIDTH
        this.height = props.height || HEIGHT
        this.pos = props.pos || POS
        this.tiles = props.tiles || TILES

        this.tileW = TILE_W
        this.tileH = TILE_H

        this.figures = {}
        this.figureBaseZ = this.width * this.height + this.tiles.length

        this.cartesian = {}
        this.isometric = {}

        // TODO: take from css?
        this.isometric.matrix = mxCompose(mxRotate(-45), mxSkew(19, 19))
        this.isometric.matrixRe = mxInverse(this.isometric.matrix)
    }

    cartToIso = point => mxApplyToPoint(this.isometric.matrix, point)
    isoToCart = point => mxApplyToPoint(this.isometric.matrixRe, point)
    cartToPos = point => [
        Math.floor(point[0] / TILE_W),
        Math.floor(point[1] / TILE_H),
    ]
    mousePosToTilePos = (mouseX, mouseY) => this.cartToPos(this.isoToCart([
        mouseX - this.cartesian.left,
        mouseY - this.cartesian.top
    ]))

    setCurrentPlayer(figureId) {
        this.currentPlayer = this.figures[figureId]
        this.currentPlayer.classes.push("current")
        this.currentPlayer.extraZ = 4 // TODO: make interface for this and move 4 to constants
    }

    currentPlayerStartRoute(pos) {
        if ( this.currentPlayer ) {
            this.currentPlayer.startRoute(pos)
        }
    }

    setMoveSpeed(speed) {
        this.cartesian.node.style.transition =
            `top ${speed}s linear, left ${speed}s linear`
    }

    addFigure(figureId, figure) {
        this.figures[figureId] = figure
        figure.scene = this
        figure.id = figureId
    }

    renderFigure(figureId) {
        const figure = this.figures[figureId]

        if ( !figure ) {
            throw `Figure not found by id: "${figureId}"`
        }

        figure.render(
            this.cartesian.node,
            this.tileW,
            this.tileH,
            this.cartToIso,
            this.figureBaseZ,
        )
    }

    renderAllFigures() {
        for ( let figureId in this.figures ) {
            this.renderFigure(figureId)
        }
    }

    render(parentNode, parentWidth, parentHeight, sceneId) {
        this.parentWidth = parentWidth
        this.parentHeight = parentHeight

        this.renderCartesian(parentNode)
        this.renderIsometric(this.cartesian.node, sceneId)

        this.renderTiles()
    }

    renderTiles() {
        this.tiles.forEach(this.renderTile)
    }

    renderTile =([type,x,y,w,h], index) => {
        const tile = div()

        const s = tile.style

        s.top = y * this.tileH + "px"
        s.left = x * this.tileW + "px"
        s.width = w * this.tileW + "px"
        s.height = h * this.tileH + "px"
        s.zIndex = index + 1

        tile.className = [ "tile", type ].join(" ")

        this.isometric.node.appendChild(tile)
    }

    renderIsometric(parentNode, sceneId) {
        this.isometric.node = div()

        this.isometric.width = this.tileW * this.width
        this.isometric.height = this.tileH * this.height

        this.isometric.node.className = "scene isometric"

        parentNode.appendChild(this.isometric.node)
    }

    renderCartesian(parentNode) {
        this.cartesian.node = div()

        this.move(this.pos)

        this.cartesian.node.style.zIndex = this.zIndex

        this.cartesian.node.className = "scene cartesian"

        parentNode.appendChild(this.cartesian.node)
    }

    move(pos) {
        this.pos = pos

        const x = this.tileW / 2 + this.pos[0] * this.tileW
        const y = this.tileH / 2 + this.pos[1] * this.tileH

        const iso = this.cartToIso([x, y])

        this.cartesian.offset = iso

        this.cartesian.top = this.parentHeight / 2 - iso[1]
        this.cartesian.left = this.parentWidth / 2 - iso[0]

        this.cartesian.node.style.top = this.cartesian.top + "px"
        this.cartesian.node.style.left = this.cartesian.left + "px"
    }
}
