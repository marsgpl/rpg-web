//

import Unit from "class/Unit"

export default class extends Unit {
    constructor(props) {
        super(props)

        this.addHp = true

        this.classes.push("mob")
    }
}
