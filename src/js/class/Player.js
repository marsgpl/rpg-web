//

import Unit from "class/Unit"

const MODEL = "JockMale"
const SPEED = .5
const WIDTH = 55

export default class extends Unit {
    constructor(props) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.speed = props.speed || SPEED

        this.calcWH(props.width || WIDTH)

        this.needRenderHp = true
        this.extraZ = 3

        this.classes.push("Player")
    }
}
