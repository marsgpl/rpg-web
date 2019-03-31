//

import Figure from "class/Figure"

export default class extends Figure {
    constructor(props = {}) {
        super(props)

        this.equip = props.equip
        this.basicMulZ = 3

        this.classes.push("item")
    }
}
