//

import Mob from "class/Mob"

export default class extends Mob {
    constructor(props) {
        super(props)

        this.name = props.name || "Rat"
        this.level = props.level || 1
        this.hp = props.hp || [5,5]

        this.whf = 625.9 / 318.6

        this.width = 65 // px
        this.height = this.width / this.whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 2

        this.classes.push("Rat")
    }
}
