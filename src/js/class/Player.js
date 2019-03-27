//

import Unit from "class/Unit"

export default class extends Unit {
    constructor(props) {
        super(props)

        this.width = 40 // px
        this.height = 75 // px

        this.addHp = true

        this.speed = .5

        this.classes.push("player")
    }
}
