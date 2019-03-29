//

import Npc from "class/Npc"

export default class extends Npc {
    constructor(props) {
        super(props)

        this.name = this.name || "Trader"
        this.level = 1
        this.hp = [1,1]

        const whf = 84.3 / 270.4

        this.width = 37 // px
        this.height = this.width / whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .055

        this.classes.push("Trader")
    }
}
