//

import {
    compose as mxCompose,
    rotateDEG as mxRotate,
    skewDEG as mxSkew,
    applyToPoint as mxApplyToPoint,
} from "transformation-matrix"

export default class {
    constructor(props) {
        this.width = props.width || 10 // tile
        this.height = props.height || 10 // tile
        this.pos = props.pos || [4,4] // [tile,tile]
        this.tiles = props.tiles || []

        this.tileW = 32 // px
        this.tileH = 32 // px

        this.figures = {}
        this.figureBaseZ = this.width * this.height + this.tiles.length

        this.cartesian = {}
        this.isometric = {}

        this.isometric.matrix = mxCompose(
            mxRotate(-45),
            mxSkew(19, 19),
        )
    }

    getTilePosByMouse(x, y) {
        x += this.cartesian.offset[0]
        y += this.cartesian.offset[1]

        const isoY = (y*2 - 1/2 + x) / 2
        const isoX = x - isoY

        return [
            Math.floor(isoX / (this.tileH * 0.950583)),
            Math.floor(isoY / (this.tileH * 0.950583)),
        ]
    }

    cartToIso = point => mxApplyToPoint(this.isometric.matrix, point)

    setCurrentPlayer(figureId) {
        this.currentPlayer = this.figures[figureId]
        this.currentPlayer.extraZ = 4
    }

    currentPlayerStartRoute(pos) {
        if ( this.currentPlayer ) {
            this.currentPlayer.startRoute(pos, this)
        }
    }

    setMoveSpeed(speed) {
        const tr = `top ${speed}s linear, left ${speed}s linear`

        this.cartesian.node.style.transition = tr

        if ( this.currentPlayer ) {
            this.currentPlayer.node.style.transition = tr
        }
    }

    moveCurrentPlayer(pos, angle) {
        this.move(pos)

        if ( this.currentPlayer ) {
            this.currentPlayer.move(pos, angle, this.tileW, this.tileH, this.cartToIso)
            this.currentPlayer.recalcZ(this.figureBaseZ)
        }
    }

    addFigure(figureId, figure) {
        this.figures[figureId] = figure
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
        const tile = document.createElement("div")

        const s = tile.style

        s.top = y * this.tileH + "px"
        s.left = x * this.tileW + "px"
        s.width = w * this.tileW + "px"
        s.height = h * this.tileH + "px"
        s.zIndex = index + 1

        tile.className = "tile " + type

        this.isometric.node.appendChild(tile)
    }

    renderIsometric(parentNode, sceneId) {
        this.isometric.node = document.createElement("div")

        this.isometric.width = this.tileW * this.width
        this.isometric.height = this.tileH * this.height

        const s = this.isometric.node.style

        s.width = this.isometric.width + "px"
        s.height = this.isometric.height + "px"

        s.zIndex = 1

        this.isometric.node.className = "scene isometric"

        parentNode.appendChild(this.isometric.node)
    }

    renderCartesian(parentNode) {
        this.cartesian.node = document.createElement("div")

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

        const s = this.cartesian.node.style

        s.top = this.parentHeight / 2 - iso[1] + "px"
        s.left = this.parentWidth / 2 - iso[0] + "px"
    }
}
