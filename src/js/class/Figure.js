//

export default class {
    constructor(pos) {
        this.pos = pos // [tile,tile]

        this.classes = [ "figure" ]
    }

    render(parentNode, tileW, tileH, cartToIso) {
        this.node = document.createElement("div")

        const x = tileW / 2 + this.pos[0] * tileW
        const y = tileH / 2 + this.pos[1] * tileH
        const iso = cartToIso([x, y])

        iso[0] -= this.width / 2
        iso[1] -= this.height

        const s = this.node.style

        s.top = iso[1] + "px"
        s.left = iso[0] + "px"
        s.width = this.width + "px"
        s.height = this.height + "px"
        s.zIndex = this.zIndex

        this.node.className = this.classes.join(" ")

        this.renderDetails(this.node)

        parentNode.appendChild(this.node)
    }

    move(pos, tileW, tileH, cartToIso) {
        this.pos = pos

        const x = tileW / 2 + this.pos[0] * tileW
        const y = tileH / 2 + this.pos[1] * tileH

        const iso = cartToIso([x, y])

        iso[0] -= this.width / 2
        iso[1] -= this.height

        this.node.style.top = iso[1] + "px"
        this.node.style.left = iso[0] + "px"
    }

    renderDetails(parentNode) {}
}
