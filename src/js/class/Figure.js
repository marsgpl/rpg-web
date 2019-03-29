//

import models from "const/models"
import {div} from "lib/helper"

const MODEL = "Default"
const POS = [0,0]
const ANGLE = "s"
const WIDTH = 30 // px

export default class {
    constructor(props) {
        this.model = this.validateModel(props.model)
        this.pos = props.pos || POS
        this.angle = props.angle || ANGLE

        this.calcWH(props.width || WIDTH)

        // z-index bonus to move current player or npc or bosses above unimportant figures
        // should not be set outside
            // current player: +4
            // player: +3
            // npc: +2
            // boss: +1
            // other: 0
        this.extraZ = 0

        this.classes = [ "figure" ]
    }

    validateModel(model) {
        return models[model] ? model : MODEL
    }

    renderModel() {
        const model = models[this.model]

        if ( !model ) {
            throw `Model not found by id: "${this.model}"`
        }

        if ( model.loaded ) {
            this.drawModel(model)
        } else if ( model.loading ) {
            model.onLoad.push(this.drawModel)
        } else { // init loading
            model.loading = true
            model.onLoad = model.onLoad || []
            model.onLoad.push(this.drawModel)
            this.loadModel(model)
        }
    }

    async loadModel(model) {
        const r = await fetch(model.url)
        const svg = await r.text()

        model.loaded = true
        model.svg = svg

        model.onLoad.forEach(cb => cb(model))

        delete model.loading
        delete model.onLoad
    }

    drawModel = model => {
        this.bg = {}

        this.bg.node = div()

        this.bg.node.className = [ "bg", this.angle ].join(" ")
        this.bg.node.innerHTML = model.svg // TODO: optimize?

        this.node.appendChild(this.bg.node)
    }

    render(parentNode, tileW, tileH, cartToIso, figureBaseZ) {
        this.node = div()

        this.move(this.pos, this.angle, tileW, tileH, cartToIso)

        const s = this.node.style

        s.width = this.width + "px"
        s.height = this.height + "px"

        this.recalcZ(figureBaseZ)

        this.node.className = this.classes.join(" ")

        this.renderDetails(this.node)

        parentNode.appendChild(this.node)

        this.renderModel()
    }

    recalcZ(figureBaseZ) {
        this.node.style.zIndex = figureBaseZ * 5 + (this.pos[1] - this.pos[0]) * 5 + this.extraZ
    }

    move(pos, angle, tileW, tileH, cartToIso) {
        this.pos = pos
        this.angle = angle

        const x = tileW / 2 + this.pos[0] * tileW
        const y = tileH / 2 + this.pos[1] * tileH

        const iso = cartToIso([x, y])

        let bgMulX = 1
        let bgMulY = 1

        if ( this.angle=="se" || this.angle=="e" || this.angle=="ne" || this.angle=="n" ) {
            bgMulX = -1
        }

        if ( this.bg ) {
            this.bg.node.className = [ "bg", this.angle ].join(" ")
        }

        iso[0] -= this.width / 2 - this.bgX * bgMulX
        iso[1] -= this.height - this.bgY * bgMulY

        const s = this.node.style

        s.top = iso[1] + "px"
        s.left = iso[0] + "px"
    }

    renderDetails(parentNode) {}

    calcWH(width) {
        const model = models[this.model]

        this.width = width
        this.height = this.width / model.whf // px

        // move whole figure with this offset to make background stand exactly on tile center
        this.bgX = this.width * model.bgX
        this.bgY = this.height * model.bgY
    }
}
