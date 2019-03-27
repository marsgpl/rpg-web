//

import * as matrix from "transformation-matrix"

export default class {
    constructor({width, height, pos, debug}) {
        this.width = width // tile
        this.height = height // tile
        this.pos = pos // [tile,tile]
        this.debug = debug

        this.tileW = 32 // px
        this.tileH = 32 // px

        this.figures = {}
        this.nextFigureIndex = 1

        this.isometric = {}
        this.cartesian = {}

        this.isometric.matrix = matrix.compose(
            matrix.rotateDEG(-45),
            matrix.skewDEG(19, 19),
        )
    }

    getTilePosByMouse =(x, y) => {
        x += this.isometric.offset[0]
        y += this.isometric.offset[1]

        const isoY = (y*2 - 1/2 + x) / 2
        const isoX = x - isoY

        return [
            Math.floor(isoX / (this.tileH * 0.950583)),
            Math.floor(isoY / (this.tileH * 0.950583)),
        ]
    }

    cartToIso = point => matrix.applyToPoint(this.isometric.matrix, point)

    setCurrentPlayer(figureId) {
        this.currentPlayer = this.figures[figureId]
    }

    currentPlayerStartRoute(pos) {
        if ( this.currentPlayer ) {
            this.currentPlayer.startRoute(pos, this)
        }
    }

    setMoveSpeed(speed) {
        const tr = `top ${speed}s linear, left ${speed}s linear`

        this.isometric.node.style.transition = tr
        this.cartesian.node.style.transition = tr

        if ( this.currentPlayer ) {
            this.currentPlayer.node.style.transition = tr
        }
    }

    moveCurrentPlayer(pos) {
        this.move(pos)

        if ( this.currentPlayer ) {
            this.currentPlayer.move(pos, this.tileW, this.tileH, this.cartToIso)
        }
    }

    move(pos) {
        this.pos = pos

        const x = this.tileW / 2 + this.pos[0] * this.tileW
        const y = this.tileH / 2 + this.pos[1] * this.tileH

        const iso = this.cartToIso([x, y])

        this.isometric.offset = iso

        const top = this.parentHeight / 2 - iso[1] + "px"
        const left = this.parentWidth / 2 - iso[0] + "px"

        this.isometric.node.style.top = top
        this.isometric.node.style.left = left

        this.cartesian.node.style.top = top
        this.cartesian.node.style.left = left
    }

    addFigure(figureId, figure) {
        this.figures[figureId] = figure
        figure.zIndex = this.nextFigureIndex++
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

        this.renderIsometric(parentNode, sceneId)
        this.renderCartesian(parentNode, sceneId)
    }

    renderDebugName(parentNode, sceneId) {
        const name = document.createElement("div")

        name.className = "name"
        name.textContent = sceneId

        parentNode.appendChild(name)
    }

    renderIsometric(parentNode, sceneId) {
        this.isometric.node = document.createElement("div")

        this.isometric.width = this.tileW * this.width
        this.isometric.height = this.tileH * this.height

        const x = this.tileW / 2 + this.pos[0] * this.tileW
        const y = this.tileH / 2 + this.pos[1] * this.tileH
        const iso = this.cartToIso([x, y])

        this.isometric.offset = iso

        const s = this.isometric.node.style

        s.top = this.parentHeight / 2 - iso[1] + "px"
        s.left = this.parentWidth / 2 - iso[0] + "px"
        s.width = this.isometric.width + "px"
        s.height = this.isometric.height + "px"
        s.zIndex = this.zIndex

        if ( this.debug ) {
            this.isometric.node.className = "scene isometric debug"
            this.renderDebugName(this.isometric.node, sceneId)
        } else {
            this.isometric.node.className = "scene isometric"
        }

        parentNode.appendChild(this.isometric.node)
    }

    renderCartesian(parentNode, sceneId) {
        this.cartesian.node = document.createElement("div")

        this.cartesian.width = 0//this.tileW * this.width
        this.cartesian.height = 0//this.tileH * this.height

        const x = this.tileW / 2 + this.pos[0] * this.tileW
        const y = this.tileH / 2 + this.pos[1] * this.tileH
        const iso = this.cartToIso([x, y])

        const s = this.cartesian.node.style

        s.top = this.parentHeight / 2 - iso[1] + "px"
        s.left = this.parentWidth / 2 - iso[0] + "px"
        s.width = this.cartesian.width + "px"
        s.height = this.cartesian.height + "px"
        s.zIndex = this.zIndex

        this.cartesian.node.className = "scene cartesian"

        parentNode.appendChild(this.cartesian.node)
    }
}
