//

import Actions from "gui/Actions"
import Modals from "gui/Modals"

export default class {
    constructor(rootNode, data, modelLoader) {
        this.node = rootNode
        this.data = data
        this.modelLoader = modelLoader

        this.actions = new Actions(this)
        this.modals = new Modals(this)
    }

    addAction(name) {
        this.actions.add(name)
    }

    showAction(name) {
        this.actions.show(name)
        this.modals.hide(name)
    }

    showModal(name) {
        this.actions.hide(name)
        this.modals.show(name)
    }
}
