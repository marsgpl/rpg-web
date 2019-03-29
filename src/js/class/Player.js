//

import Unit from "class/Unit"

const MODEL = "ManJock"//"Man"
const SPEED = .5
const WIDTH = 55//46

export default class extends Unit {
    constructor(props) {
        super(props)

        this.model = this.validateModel(props.model || MODEL)
        this.speed = props.speed || SPEED

        this.calcWH(props.width || WIDTH)

        this.needRenderHp = true
        this.extraZ = 3

        this.classes.push("Player")
    }
}
