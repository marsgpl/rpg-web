//

export default class {
    constructor(props) {
        this.pos = props.pos || [0,0] // [tile,tile]
        this.angle = props.angle || "s"

        this.extraZ = 0

        this.width = 10 // px
        this.height = 10 // px

        this.bgX = 0
        this.bgY = 0

        this.classes = [ "figure" ]
    }

    render(parentNode, tileW, tileH, cartToIso, figureBaseZ) {
        this.node = document.createElement("div")

        this.move(this.pos, this.angle, tileW, tileH, cartToIso)

        const s = this.node.style

        s.width = this.width + "px"
        s.height = this.height + "px"

        this.recalcZ(figureBaseZ)

        this.node.className = this.classes.join(" ")

        this.renderBackground(this.node)
        this.renderDetails(this.node)

        parentNode.appendChild(this.node)
    }

    recalcZ(figureBaseZ) {
        this.node.style.zIndex = figureBaseZ * 5 + (this.pos[1] - this.pos[0]) * 5 + this.extraZ
    }

    move(pos, angle, tileW, tileH, cartToIso) {
        this.pos = pos
        this.angle = angle

        const x = tileW / 2 + this.pos[0] * tileW
        const y = tileH / 2 + this.pos[1] * tileH

        const iso = cartToIso([x, y])

        let bgMulX = 1
        let bgMulY = 1

        if ( this.angle=="se" || this.angle=="e" || this.angle=="ne" || this.angle=="n" ) {
            bgMulX = -1
        }

        if ( this.bg ) {
            this.bg.node.className = [ "bg", this.angle ].join(" ")
        }

        iso[0] -= this.width / 2 - this.bgX * bgMulX
        iso[1] -= this.height - this.bgY * bgMulY

        const s = this.node.style

        s.top = iso[1] + "px"
        s.left = iso[0] + "px"
    }

    renderBackground(parentNode) {
        this.bg = {}
        this.bg.node = document.createElement("div")

        this.bg.node.className = [ "bg", this.angle ].join(" ")

        parentNode.appendChild(this.bg.node)
    }

    renderDetails(parentNode) {}
}
