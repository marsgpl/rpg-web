//

import {evl,div,purge} from "lib/helper"

const MARGIN = 5

const EQUIPMENT_CELL_POS = {
    Helm: "c2 r1",
    Shirt: "c2 r2",
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
            this.renderBodyEquipmentCell(modal, name)
        }
    }

    renderBodyEquipmentCell(modal, name) {
        let cell = div()

        cell.className = [ "cell", name, EQUIPMENT_CELL_POS[name] ].join(" ")

        const item = this.gui.dataLayer.getEquipmentItem(name)

        if ( item ) {
            this.gui.modelLoader.load(item.model, this.renderEquipmentCell.bind(this, name, cell))
        } else {
            if ( name == "Vest" ) {
                return // do not add empty Vest cell
            } else if ( name == "Shirt" ) {
                if ( !this.gui.dataLayer.getEquipmentItem("Vest") ) {
                    cell.textContent = "Chest"
                }
            } else {
                cell.textContent = name
            }
        }

        modal.body.appendChild(cell)
        modal.cells = modal.cells || {}
        modal.cells[name] = cell
    }

    renderEquipmentCell(name, cell, model) {
        const item = this.gui.dataLayer.getEquipmentItem(name)

        cell.className += " model-" + item.model + " pointer"
        cell.innerHTML = model.svg

        this.colorItemCell(item, cell)

        if ( (name=="Vest" && this.gui.dataLayer.getEquipmentItem("Shirt"))
            || (name=="Shirt" && this.gui.dataLayer.getEquipmentItem("Vest"))
        ) {
            let node = this.modals.Equipment.cells.Vest
                && this.modals.Equipment.cells.Vest.querySelector("._back")

            if ( node ) {
                node.style.fill = "none"
            }
        }

        evl(cell, "click", this.unequip.bind(this, name))
    }

    colorItemCell(item, cell) {
        if ( item.style ) {
            for ( let className in item.style ) {
                let node = cell.querySelector("." + className)

                if ( node ) {
                    let props = item.style[className]

                    for ( let prop in props ) {
                        node.style[prop] = props[prop]
                    }
                }
            }
        }
    }

    unequip(name) {
        try {
            this.gui.dataLayer.unequip(name)
        } catch (err) {
            alert(err)
        }
    }

    reRenderEquipmentCell(name) {
        const modal = this.modals.Equipment
        const cell = modal && modal.cells[name]

        if ( !cell ) { return }

        cell.remove()
        this.renderBodyEquipmentCell(modal, name)

        if ( name == "Vest" ) {
            this.reRenderEquipmentCell("Shirt")
        }
    }

    renderBodyInventory(modal) {
        for ( let i=0; i<this.gui.dataLayer.getInventorySize(); ++i ) {
            let cell = div()
            cell.className = "cell"

            let item = this.gui.dataLayer.getInventoryItem(i)

            if ( item ) {
                this.gui.modelLoader.load(item.model, this.renderInventoryItem.bind(this, cell, item))
            }

            modal.body.appendChild(cell)
        }

        const clear = div()
        clear.className = "clear"
        modal.body.appendChild(clear)
    }

    renderInventoryItem(cell, item, model) {
        cell.className += " model-" + item.model + " pointer"
        cell.innerHTML = model.svg

        this.colorItemCell(item, cell)

        evl(cell, "click", this.inventoryItemOnClick.bind(this, item))
    }

    inventoryItemOnClick(item) {
        const wasEquipped = this.gui.dataLayer.equipFromInventory(item)

        if ( !wasEquipped ) {
            alert("item info: " + item.model)
        }
    }

    reRenderInventory() {
        const modal = this.modals.Inventory

        if ( !modal ) { return }

        purge(modal.body)

        this.renderBodyInventory(modal)
    }
}
