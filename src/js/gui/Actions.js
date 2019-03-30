//

import {evl,div} from "lib/helper"

const WIDTH = 60
const PADDING = 5

export default class {
    constructor(gui) {
        this.gui = gui
        this.actions = {}
    }

    add(name) {
        this.actions[name] = { name }
    }

    show(name) {
        const action = this.actions[name]

        if ( !action || action.node ) { return }

        action.node = div()
        action.node.className = [ "action", name ].join(" ")
        action.node.textContent = name.substr(0,1).toUpperCase()

        evl(action.node, "click", this.gui.showModal.bind(this.gui, name))

        this.gui.node.appendChild(action.node)

        this.rearrange()
    }

    hide(name) {
        const action = this.actions[name]

        if ( !action || !action.node ) { return }

        action.node.remove()
        action.node = null

        this.rearrange()
    }

    rearrange() {
        let index = 0

        for ( let name in this.actions ) {
            let action = this.actions[name]

            if ( action.node ) {
                action.node.style.right = (PADDING + (index++) * (WIDTH + PADDING)) + "px"
            }
        }
    }
}
