//

import Item from "class/Item"

const MODEL = "Shield"
const WIDTH = 36

export default class extends Item {
    constructor(props) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)

        this.calcWH(props.width || WIDTH)

        this.classes.push("Shield")
    }
}
