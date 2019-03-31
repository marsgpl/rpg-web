//

import Item from "class/Item"

const MODEL = "Shield"
const EQUIP = "Shield"
const WIDTH = 35

export default class extends Item {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.equip = props.equip || EQUIP

        this.calcWH(props.width || WIDTH)

        this.classes.push("Shield")
    }
}
