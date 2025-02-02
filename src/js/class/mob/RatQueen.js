//

import MobBoss from "class/MobBoss"

const MODEL = "Rat"
const NAME = "Rat Queen"
const LEVEL = 2
const HP = [15,15]
const SPEED = 1
const HEIGHT = 87

export default class extends MobBoss {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.name = props.name || NAME
        this.level = props.level || LEVEL
        this.hp = props.hp || HP
        this.speed = props.speed || SPEED

        this.calcWH(props.width, props.height || HEIGHT)

        this.classes.push("RatQueen")
    }
}
