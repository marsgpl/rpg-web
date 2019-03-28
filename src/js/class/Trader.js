//

import Npc from "class/Npc"

export default class extends Npc {
    constructor(props) {
        super(props)

        this.whf = 84.3 / 270.4

        this.width = 37 // px
        this.height = this.width / this.whf // px

        this.bgX = this.width * .1
        this.bgY = this.height * .06

        this.classes.push("Trader")
    }
}
