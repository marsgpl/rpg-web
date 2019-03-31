//

import Actions from "gui/Actions"
import Modals from "gui/Modals"

export default class {
    constructor(rootNode, dataLayer, modelLoader) {
        this.node = rootNode
        this.dataLayer = dataLayer
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
