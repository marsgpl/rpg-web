//

import models from "const/models"
import MobBoss from "class/MobBoss"

export default class extends MobBoss {
    constructor(props) {
        super(props)

        this.model = "RatQueen"

        this.name = this.name || "Rat Queen"
        this.level = this.level || 2
        this.hp = this.hp || [15,15]

        this.width = 160 // px
        this.height = this.width / models[this.model].whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 1.5

        this.classes.push("RatQueen")
    }
}
