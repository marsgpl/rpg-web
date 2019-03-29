//

import Unit from "class/Unit"

export default class extends Unit {
    constructor(props) {
        super(props)

        this.extraZ = 2

        this.classes.push("npc")
    }
}
