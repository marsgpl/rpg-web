//

import Npc from "class/Npc"

const MODEL = "RogueMale"
const NAME = "Trader"
const WIDTH = 44

export default class extends Npc {
    constructor(props) {
        super(props)

        this.model = this.validateModel(props.model || MODEL)
        this.name = props.name || NAME

        this.calcWH(props.width || WIDTH)

        this.classes.push("Trader")
    }
}
