//

import Mob from "class/Mob"

export default class extends Mob {
    constructor(props = {}) {
        super(props)

        this.extraZ = 1

        this.classes.push("boss")
    }
}
