//

export default class {
    constructor(data = {}) {
        this.data = data
    }

    setCurrentPlayer(playerId) {
        this.currentPlayer = this.data.players[playerId]
    }

    getPlayerEquipment(playerId) {
        const player = this.data.players[playerId]

        return player && player.equipment
    }

    getEquipmentItem(slotName) {
        return this.currentPlayer.equipment[slotName]
    }

    removeEquippedItem(slotName) {
        const item = this.getEquipmentItem(slotName)

        if ( item ) {
            this.currentPlayer.equipment[slotName] = null
            return item
        }
    }

    getInventoryItemIndex(item) {
        return this.currentPlayer.inventory.items.indexOf(item)
    }

    removeItemFromInventory(item) {
        const itemIndex = this.getInventoryItemIndex(item)

        if ( itemIndex > -1 ) {
            this.currentPlayer.inventory.items.splice(itemIndex, 1)
            return item
        }
    }

    getInventorySize() {
        return this.currentPlayer.inventory.size
    }

    getInventoryItem(index) {
        return this.currentPlayer.inventory.items[index]
    }

    isInventoryFull() {
        return this.currentPlayer.inventory.items.length
            >= this.currentPlayer.inventory.size
    }

    unequip(slotName) {
        if ( this.isInventoryFull() ) {
            throw `Can't unequip slot "${slotName}": inventory is full`
        }

        const item = this.removeEquippedItem(slotName)
        if ( !item ) { return }

        this.gui.modals.reRenderEquipmentCell(slotName)

        this.putItemInInventory(item)

        this.game.currentScene.currentPlayer.updateEquipmentItem(slotName)
    }

    unequipRaw(slotName) {
        return this.removeEquippedItem(slotName)
    }

    equipRaw(slotName, item) {
        this.currentPlayer.equipment[slotName] = item
    }

    equipFromInventory(item) {
        const slotName = item.equip
        if ( !slotName ) { return }

        const slotItem = this.getEquipmentItem(slotName)
        if ( slotItem === undefined ) { return } // unknown slot name

        if ( slotItem ) {
            this.unequipRaw(slotName)
            this.putItemInInventoryRaw(slotItem, this.getInventoryItemIndex(item))
        }

        item = this.removeItemFromInventory(item)
        if ( !item ) { return } // item is not in inventory

        this.equipRaw(slotName, item)

        this.gui.modals.reRenderEquipmentCell(slotName)
        this.gui.modals.reRenderInventory()

        this.game.currentScene.currentPlayer.updateEquipmentItem(slotName)

        return true
    }

    putItemInInventoryRaw(item, beforeIndex = -1) {
        if ( beforeIndex > -1 ) {
            this.currentPlayer.inventory.items.splice(beforeIndex, 0, item)
        } else {
            this.currentPlayer.inventory.items.push(item)
        }
    }

    putItemInInventory(item) {
        this.currentPlayer.inventory.items.push(item)

        this.gui.modals.reRenderInventory()
    }

    bindGui(gui) {
        this.gui = gui
    }

    bindGame(game) {
        this.game = game
    }
}
