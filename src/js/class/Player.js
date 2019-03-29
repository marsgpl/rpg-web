//

import Unit from "class/Unit"

export default class extends Unit {
    constructor(props) {
        super(props)

        const whf = 84.3 / 270.4

        this.width = 38 // px
        this.height = this.width / whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .055

        this.speed = .5
        this.addHp = true
        this.extraZ = 3

        this.classes.push("player")
    }
}
