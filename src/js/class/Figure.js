//

import {div,purge} from "lib/helper"
import models from "const/models"

const DEFAULT_MODEL = "Default"
const POS = [0,0]
const ANGLE = "s"
const HEIGHT = 30 // px

export default class {
    constructor(props = {}) {
        this.model = this.validateModelName(props.model)
        this.pos = props.pos || POS
        this.angle = props.angle || ANGLE
        this.look = props.look

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

                purge(this.bg.node)
                this.bg.node.appendChild(model.svgNode.cloneNode(true))

                this.applyLook(this.bg.node.firstChild, this.look)

                if ( this.applyEquipment ) {
                    this.applyEquipment()
                }

                needRecalc = true
            }
        } else {
            this.bg = {}

            this.bg.model = model
            this.bg.angle = this.angle
            this.bg.node = div()

            this.bg.node.className = [ "bg", this.angle ].join(" ")
            this.bg.node.appendChild(model.svgNode.cloneNode(true))

            this.applyLook(this.bg.node.firstChild, this.look)

            if ( this.applyEquipment ) {
                this.applyEquipment()
            }

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

        if ( this.renderDetails ) {
            this.renderDetails(this.node)
        }

        parentNode.appendChild(this.node)
    }

    getModelSuffix() {
        return (this.angle=="n") ? "N"
        : (this.angle=="w" || this.angle=="e" || this.angle=="nw" || this.angle=="ne") ? "E"
        : ""
    }

    getFullModelName() {
        const modelName = this.model + this.getModelSuffix()
        return models[modelName] ? modelName : this.model
    }

    move(pos, angle) {
        this.pos = pos
        this.angle = angle

        this.node.style.zIndex = this.scene.figureBaseZ * this.basicMulZ
            + (this.pos[1] - this.pos[0]) * this.basicMulZ
            + this.extraZ

        const modelName = this.getFullModelName()

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

        if ( this.model == "JockMale" && model.pose == "e" ) {
            bgMulX = -bgMulX
        }

        iso[0] -= this.width / 2 - this.width * (model.bgX||0) * bgMulX
        iso[1] -= this.height - this.height * (model.bgY||0) * bgMulY

        this.node.style.top = iso[1] + "px"
        this.node.style.left = iso[0] + "px"
    }

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

    applyLook(parentNode, look, noBack = false) {
        if ( !look ) { return }

        for ( let className in look ) {
            if ( noBack && className.indexOf("_back")===0 ) { continue }

            let node = parentNode.querySelector("." + className)

            if ( node ) {
                let props = look[className]

                for ( let prop in props ) {
                    node.style[prop] = props[prop]
                }
            }
        }
    }
}
