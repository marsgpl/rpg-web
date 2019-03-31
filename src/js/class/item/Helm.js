//

import Item from "class/Item"

const MODEL = "Helm"
const EQUIP = "Helm"
const WIDTH = 25

export default class extends Item {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.equip = props.equip || EQUIP

        this.basicMulZ = 4

        this.calcWH(props.width || WIDTH)

        this.classes.push("Helm")
    }
}
