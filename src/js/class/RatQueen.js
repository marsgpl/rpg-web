//

import MobBoss from "class/MobBoss"

export default class extends MobBoss {
    constructor(props) {
        super(props)

        this.name = this.name || "Rat Queen"
        this.level = this.level || 2
        this.hp = this.hp || [15,15]

        const whf = 626.6 / 315.2

        this.width = 95 // px
        this.height = this.width / whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 1.5

        this.classes.push("RatQueen")
    }
}
