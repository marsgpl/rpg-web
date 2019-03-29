//

import models from "const/models"
import Npc from "class/Npc"

export default class extends Npc {
    constructor(props) {
        super(props)

        this.model = "Man"

        this.name = this.name || "Trader"
        this.level = 1
        this.hp = [1,1]

        this.width = 44 // px
        this.height = this.width / models[this.model].whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .055

        this.classes.push("Trader")
    }
}
