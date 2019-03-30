//

import {evl,div} from "lib/helper"

const MARGIN = 5

const EQUIPMENT_CELL_POS = {
    Helm: "c2 r1",
    Shirt: "c3 r1",
    Sword: "c1 r2",
    Vest: "c2 r2",
    Shield: "c3 r2",
    Ring: "c1 r3",
    Pants: "c2 r3",
    Bands: "c3 r3",
    Boots: "c2 r4",
}

export default class {
    constructor(gui) {
        this.gui = gui
        this.modals = {}
        this.modalsIndex = []
        this.baseZ = 100
    }

    show(name) {
        if ( this.modals[name] ) { return }

        const modal = {}

        modal.name = name
        modal.node = div()
        modal.node.className = [ "modal", name ].join(" ")

        this.render(modal)
        this.gui.node.appendChild(modal.node)

        this.modals[name] = modal
        this.modalsIndex.push(name)

        this.reindex()
        this.rearrange()
    }

    hide(name) {
        const modal = this.modals[name]

        if ( !modal ) { return }

        modal.node.remove()
        delete this.modals[name]

        const index = this.modalsIndex.indexOf(name)
        if ( index > -1 ) this.modalsIndex.splice(index, 1)

        this.reindex()
        this.rearrange()
    }

    reindex() {
        for ( let i=0; i<this.modalsIndex.length; ++i ) {
            let name = this.modalsIndex[i]
            let modal = this.modals[name]

            if ( modal ) {
                modal.node.style.zIndex = this.baseZ + i
            }
        }
    }

    rearrange() {
        if ( this.modals.Inventory ) {
            if ( this.modals.Equipment ) {
                const css = getComputedStyle(this.modals.Equipment.node)
                this.modals.Inventory.node.style.top = (MARGIN + parseInt(css.height) + MARGIN) + "px"
            } else {
                this.modals.Inventory.node.style.top = MARGIN + "px"
            }
        }
    }

    render(modal) {
        this.renderTitle(modal)
        this.renderBody(modal)
    }

    renderTitle(modal) {
        const title = div()
        title.className = [ "title", modal.name ].join(" ")
        title.textContent = modal.name

        const close = div()
        close.className = "close"
        evl(close, "click", this.gui.showAction.bind(this.gui, modal.name))

        title.appendChild(close)
        modal.node.appendChild(title)
    }

    renderBody(modal) {
        modal.body = div()
        modal.body.className = "body"

        const fu = this["renderBody" + modal.name]

        if ( fu ) {
            fu.call(this, modal)
        }

        modal.node.appendChild(modal.body)
    }

    renderBodyEquipment(modal) {
        for ( let name in EQUIPMENT_CELL_POS ) {
            let cell = div()

            cell.className = [ "cell", name, EQUIPMENT_CELL_POS[name] ].join(" ")

            if ( this.gui.data.currentPlayer.equipment[name] ) {
                //
            } else {
                cell.textContent = name
            }

            modal.body.appendChild(cell)
        }
    }

    renderBodyInventory(modal) {
        for ( let i=0; i<this.gui.data.currentPlayer.inventory.size; ++i ) {
            let cell = div()
            cell.className = "cell"
            modal.body.appendChild(cell)
        }

        const clear = div()
        clear.className = "clear"
        modal.body.appendChild(clear)
    }
}
