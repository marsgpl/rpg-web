//

import Npc from "class/Npc"

export default class extends Npc {
    constructor(props) {
        super(props)

        this.width = 40 // px
        this.height = 75 // px

        this.classes.push("Trader")
    }
}
