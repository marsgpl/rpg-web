//

export default class {
    constructor(data) {
        this.data = data
    }

    getEquipmentItem(name) {
        return this.data.currentPlayer.equipment[name]
    }

    removeEquippedItem(name) {
        const item = this.getEquipmentItem(name)

        if ( item ) {
            this.data.currentPlayer.equipment[name] = null
            return item
        }
    }

    getInventoryItemIndex(item) {
        return this.data.currentPlayer.inventory.items.indexOf(item)
    }

    removeItemFromInventory(item) {
        const itemIndex = this.getInventoryItemIndex(item)

        if ( itemIndex > -1 ) {
            this.data.currentPlayer.inventory.items.splice(itemIndex, 1)
            return item
        }
    }

    getInventorySize() {
        return this.data.currentPlayer.inventory.size
    }

    getInventoryItem(index) {
        return this.data.currentPlayer.inventory.items[index]
    }

    isInventoryFull() {
        return this.data.currentPlayer.inventory.items.length
            >= this.data.currentPlayer.inventory.size
    }

    unequip(name) {
        if ( this.isInventoryFull() ) {
            throw `Can't unequip item "${name}": inventory is full`
        }

        const item = this.removeEquippedItem(name)
        if ( !item ) { return }

        this.gui.modals.reRenderEquipmentCell(name)

        this.putItemInInventory(item)
    }

    unequipRaw(slotName) {
        return this.removeEquippedItem(slotName)
    }

    equipFromInventory(item) {
        const slotName = item.equip
        const slotItem = this.getEquipmentItem(slotName)

        if ( slotItem === undefined ) { return } // unknown slot name

        if ( slotItem ) {
            this.unequipRaw(slotName)
            this.putItemInInventoryRaw(slotItem, this.getInventoryItemIndex(item))
        }

        item = this.removeItemFromInventory(item)
        if ( !item ) { return } // item is not in inventory

        this.data.currentPlayer.equipment[slotName] = item

        this.gui.modals.reRenderEquipmentCell(slotName)
        this.gui.modals.reRenderInventory()

        return true
    }

    putItemInInventoryRaw(item, beforeIndex = -1) {
        if ( beforeIndex > -1 ) {
            this.data.currentPlayer.inventory.items.splice(beforeIndex, 0, item)
        } else {
            this.data.currentPlayer.inventory.items.push(item)
        }
    }

    putItemInInventory(item) {
        this.data.currentPlayer.inventory.items.push(item)

        this.gui.modals.reRenderInventory()
    }

    bindGui(gui) {
        this.gui = gui
    }

    bindGame(game) {
        this.game = game
    }
}
