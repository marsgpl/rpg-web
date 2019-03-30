//

import Item from "class/Item"

const MODEL = "Helm"
const WIDTH = 25

export default class extends Item {
    constructor(props) {
        super(props)

        this.model = this.validateModel(props.model || MODEL)

        this.basicMulZ = 4

        this.calcWH(props.width || WIDTH)

        this.classes.push("Helm")
    }
}
