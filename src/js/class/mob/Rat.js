//

import Mob from "class/Mob"

const MODEL = "Rat"
const NAME = "Giant Rat"
const LEVEL = 1
const HP = [5,5]
const SPEED = 1.5
const WIDTH = 110

export default class extends Mob {
    constructor(props) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.name = props.name || NAME
        this.level = props.level || LEVEL
        this.hp = props.hp || HP
        this.speed = props.speed || SPEED

        this.calcWH(props.width || WIDTH)

        this.classes.push("Rat")
    }
}
