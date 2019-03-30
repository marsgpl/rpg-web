//

import {div} from "lib/helper"
import models from "const/models"

const DEFAULT_MODEL = "Default"
const POS = [0,0]
const ANGLE = "s"
const HEIGHT = 30 // px

export default class {
    constructor(props) {
        this.model = this.validateModelName(props.model)
        this.pos = props.pos || POS
        this.angle = props.angle || ANGLE

        this.calcWH(props.width, props.height || HEIGHT)

        // z-index bonus to move current player or npc or bosses above unimportant figures
        // should not be set outside
            // current player: +4
            // player: +3
            // npc: +2
            // boss: +1
            // other: 0
        this.extraZ = 0

        // there are 5 layers within 1 tile "row", but for loot on ground z indexes
        // must be always lower, so set it to 4 for loot
        this.basicMulZ = 5

        this.classes = [ "figure" ]
    }

    validateModelName(name) {
        return models[name] ? name : DEFAULT_MODEL
    }

    drawModel = model => {
        let needRecalc = false

        if ( this.bg ) {
            if ( this.bg.angle !== this.angle ) {
                this.bg.angle = this.angle
                this.bg.node.className = [ "bg", this.angle ].join(" ")
                needRecalc = true
            }

            if ( this.bg.model != model ) {
                this.bg.model = model
                this.bg.node.innerHTML = model.svg
                needRecalc = true
            }
        } else {
            this.bg = {}

            this.bg.model = model
            this.bg.angle = this.angle
            this.bg.node = div()

            this.bg.node.className = [ "bg", this.angle ].join(" ")
            this.bg.node.innerHTML = model.svg

            this.node.appendChild(this.bg.node)

            needRecalc = true
        }

        if ( needRecalc ) {
            this.calcTL()
        }
    }

    render(parentNode) {
        this.node = div()

        this.node.style.width = this.width + "px"
        this.node.style.height = this.height + "px"

        this.move(this.pos, this.angle)

        this.node.className = this.classes.join(" ")

        this.renderDetails(this.node)

        parentNode.appendChild(this.node)
    }

    getCurrentModelName() {
        const suffix
            = (this.angle[0]=="n") ? "N"
            : (this.angle=="w" || this.angle=="e") ? "E"
            : ""

        const modelName = this.model + suffix

        return models[modelName] ? modelName : this.model
    }

    move(pos, angle) {
        this.pos = pos
        this.angle = angle

        this.node.style.zIndex = this.scene.figureBaseZ * this.basicMulZ
            + (this.pos[1] - this.pos[0]) * this.basicMulZ
            + this.extraZ

        const modelName = this.getCurrentModelName()

        this.scene.game.modelLoader.load(modelName, this.drawModel)

        if ( !this.bg || this.bg.model !== modelName ) {
            this.calcTL()
        }
    }

    calcTL() {
        const x = this.scene.tileW / 2 + this.pos[0] * this.scene.tileW
        const y = this.scene.tileH / 2 + this.pos[1] * this.scene.tileH

        const iso = this.scene.cartToIso([x, y])

        let bgMulX = 1
        let bgMulY = 1

        if ( this.angle=="se" || this.angle=="e" || this.angle=="ne" || this.angle=="n" ) {
            bgMulX = -1
        }

        const model = this.bg && this.bg.model || models[this.model]

        iso[0] -= this.width / 2 - this.width * (model.bgX||0) * bgMulX
        iso[1] -= this.height - this.height * (model.bgY||0) * bgMulY

        this.node.style.top = iso[1] + "px"
        this.node.style.left = iso[0] + "px"
    }

    renderDetails(parentNode) {}

    calcWH(width = 0, height = 0) {
        const model = models[this.model]

        if ( width ) {
            this.width = width
            this.height = this.width / model.whf
        } else if ( height ) {
            this.height = height
            this.width = this.height * model.whf
        }
    }
}
