//

import models from "const/models"
import Unit from "class/Unit"

export default class extends Unit {
    constructor(props) {
        super(props)

        this.model = "Man"

        this.width = 50 // px
        this.height = this.width / models[this.model].whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .055

        this.speed = .5
        this.addHp = true
        this.extraZ = 3

        this.classes.push("Player")
    }
}
