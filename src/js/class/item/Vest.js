//

import Item from "class/Item"

const MODEL = "Vest"
const EQUIP = "Chest"
const WIDTH = 38

export default class extends Item {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.equip = props.equip || EQUIP

        this.calcWH(props.width || WIDTH)

        this.classes.push("Vest")
    }
}
