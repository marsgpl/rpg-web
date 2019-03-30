//

import Item from "class/Item"

const MODEL = "Pants"
const WIDTH = 23

export default class extends Item {
    constructor(props) {
        super(props)

        this.model = this.validateModel(props.model || MODEL)

        this.calcWH(props.width || WIDTH)

        this.classes.push("Pants")
    }
}
