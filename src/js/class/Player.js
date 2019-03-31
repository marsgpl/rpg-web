//

import {svg} from "lib/helper"
import Unit from "class/Unit"

const MODEL = "JockMale"
const SPEED = .3
const HEIGHT = 150

export default class extends Unit {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.speed = props.speed || SPEED

        this.calcWH(props.width, props.height || HEIGHT)

        this.needRenderHp = true
        this.extraZ = 3

        this.classes.push("Player")
    }

    applyEquipment(parentNode) {
        const equipment = this.scene.game.dataLayer.getPlayerEquipment(this.id)

        for ( let slotName in equipment ) {
            let item = equipment[slotName]

            if ( item ) {
                let modelName = item.model // TODO: respect "angle"
                this.scene.game.modelLoader.load(modelName, this.applyEquipmentItem.bind(this, parentNode, item))
            }
        }
    }

    applyEquipmentItem(parentNode, item, model) {
        const node = model.svgNode.cloneNode(true)
        node.setAttribute("class", "lol")
        this.applyLook(node, item.look)
        parentNode.appendChild(node)
    }
}
