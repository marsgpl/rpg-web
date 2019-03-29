//

import models from "const/models"
import Mob from "class/Mob"

export default class extends Mob {
    constructor(props) {
        super(props)

        this.model = "Rat"

        this.name = this.name || "Giant Rat"
        this.level = this.level || 1
        this.hp = this.hp || [5,5]

        this.width = 110 // px
        this.height = this.width / models[this.model].whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .33

        this.speed = 2

        this.classes.push("Rat")
    }
}
