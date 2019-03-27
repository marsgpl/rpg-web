//

import Mob from "class/Mob"

export default class extends Mob {
    constructor(props) {
        super(props)

        this.width = 50 // px
        this.height = 35 // px

        this.classes.push("Rat")
    }
}
