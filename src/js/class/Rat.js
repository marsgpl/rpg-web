//

import Mob from "class/Mob"

export default class extends Mob {
    constructor(props) {
        super(props)

        this.name = this.name || "Rat"
        this.level = this.level || 1
        this.hp = this.hp || [5,5]

        const whf = 625.9 / 318.6

        this.width = 65 // px
        this.height = this.width / whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 2

        this.classes.push("Rat")
    }
}
