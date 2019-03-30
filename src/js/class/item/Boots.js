//

import Item from "class/Item"

const MODEL = "Boots"
const WIDTH = 31

export default class extends Item {
    constructor(props) {
        super(props)

        this.model = this.validateModel(props.model || MODEL)

        this.basicMulZ = 4

        this.calcWH(props.width || WIDTH)

        this.classes.push("Boots")
    }
}
