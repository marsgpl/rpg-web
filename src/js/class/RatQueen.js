//

import Mob from "class/Mob"

export default class extends Mob {
    constructor(props) {
        super(props)

        this.name = props.name || "Rat Queen"
        this.level = props.level || 2
        this.hp = props.hp || [15,15]

        this.whf = 626.6 / 315.2

        this.width = 95 // px
        this.height = this.width / this.whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 1.5

        this.classes.push("RatQueen")
    }
}
