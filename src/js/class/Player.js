//

import Unit from "class/Unit"

const MODEL = "JockMale"
const SPEED = .3
const HEIGHT = 150
const PANTIES = {}

const WEAR_SLOT_Z_INDEX = {
    Ring: 1,
    Pants: 2,
    Boots: 3,
    Shirt: 4,
    Chest: 5,
    Helm: 6,
    Bands: 7,
    Sword: 8,
    Shield: 9,
}

export default class extends Unit {
    constructor(props = {}) {
        super(props)

        this.model = this.validateModelName(props.model || MODEL)
        this.speed = props.speed || SPEED
        this.panties = props.panties || PANTIES

        this.calcWH(props.width, props.height || HEIGHT)

        this.needRenderHp = true
        this.extraZ = 3

        this.classes.push("Player", "model-" + this.model)
    }

    applyEquipment() {
        const equipment = this.scene.game.dataLayer.getPlayerEquipment(this.id)

        for ( let slotName in equipment ) {
            let item = equipment[slotName]

            if ( item ) {
                let fullModelName = this.getFullModelName(item.model)
                this.scene.game.modelLoader.load(fullModelName, this.applyEquipmentItem.bind(this, item, slotName))
            }
        }

        this.checkPanties()
        this.shortenPants()
    }

    applyEquipmentItem(item, slotName, model) {
        const node = model.svgNodeWear.cloneNode(true)

        node.style.zIndex = WEAR_SLOT_Z_INDEX[slotName] || 1
        node.setAttribute("class", `wear ${slotName} model-${item.model}`)

        if ( item.model == "Pants" ) {
            this.shortenPants()
        }

        this.applyLook(node, item.look, true)
        this.bg.node.appendChild(node)
    }

    updateEquipmentItem(slotName) {
        const item = this.scene.game.dataLayer.getEquipmentItem(slotName)
        const node = this.bg.node.querySelector(`.wear.${slotName}`)

        if ( node ) node.remove()

        if ( item ) {
            let fullModelName = this.getFullModelName(item.model)
            this.scene.game.modelLoader.load(fullModelName, this.applyEquipmentItem.bind(this, item, slotName))
        }

        this.checkPanties()
        this.shortenPants()
    }

    shortenPants() {
        const item = this.scene.game.dataLayer.getEquipmentItem("Pants")
        if ( !item ) { return }
        if ( item.model !== "Pants" ) { return }

        const node = this.bg.node.querySelector(`.wear.Pants.model-Pants`)
        if ( !node ) { return }

        const fullModelName = this.getFullModelName(item.model)
        const model = this.scene.game.modelLoader.getModelByName(fullModelName)
        if ( !model || !model.loaded ) { return }

        const boots = this.scene.game.dataLayer.getEquipmentItem("Boots")

        if ( boots && boots.model === "Boots" ) {
            node.setAttribute("viewBox", [
                model.viewBox[0],
                model.viewBox[1],
                model.viewBox[2],
                parseInt(model.viewBox[3]) * .8,
            ].join(" "))
        } else {
            node.setAttribute("viewBox", model.viewBox.join(" "))
        }
    }

    checkPanties() {
        const panties = this.bg.node.firstChild.querySelector("._panties")
        if ( !panties ) { return }

        this.panties.removed = false

        if ( this.panties.removed ) {
            panties.style.fill = "none"
        } else {
            panties.style.fill = this.panties.color || "#ddd" // TODO: get color from model
        }
    }

    getFullModelName(modelName) {
        // if ( this.angle == "lol" ) { "kek" }
        return modelName
    }
}
