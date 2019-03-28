//

export default class {
    constructor(pos) {
        this.pos = pos // [tile,tile]

        this.angle = 0
        this.scale = 1

        this.bgX = 0
        this.bgY = 0

        this.classes = [ "figure" ]
    }

    render(parentNode, tileW, tileH, cartToIso) {
        this.node = document.createElement("div")

        this.move(this.pos, tileW, tileH, cartToIso)

        const s = this.node.style

        s.width = this.width * this.scale + "px"
        s.height = this.height * this.scale + "px"

        s.zIndex = this.zIndex

        this.node.className = this.classes.join(" ")

        this.renderBackground(this.node)
        this.renderDetails(this.node)

        parentNode.appendChild(this.node)
    }

    move(pos, tileW, tileH, cartToIso) {
        this.pos = pos

        const x = tileW / 2 + this.pos[0] * tileW
        const y = tileH / 2 + this.pos[1] * tileH

        const iso = cartToIso([x, y])

        let bgMulX = 1
        let bgMulY = 1

        if ( this.angle === 1 ) {
            bgMulX = -1
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

        const classes = [ "bg" ]

        if ( this.angle === 1 ) {
            classes.push("a1")
        }

        this.bg.node.className = classes.join(" ")

        this.node.appendChild(this.bg.node)
    }

    renderDetails(parentNode) {}
}
