//

import Figure from "class/Figure"

export default class extends Figure {
    constructor({name, level, hp, pos, angle}) {
        super(pos)

        this.name = name
        this.level = level || 1
        this.hp = hp || [1,1]

        if ( typeof angle == "number" ) {
            this.angle = angle
        }

        this.speed = 1
        this.addHp = false

        this.classes.push("unit")
    }

    renderDetails(parentNode) {
        this.renderName(parentNode)

        if ( this.addHp && this.hp[0] !== this.hp[1] ) {
            this.renderHp(parentNode)
        }
    }

    renderName(parentNode) {
        const name = document.createElement("div")

        name.className = "name"
        name.textContent = this.name

        parentNode.appendChild(name)
    }

    renderHp(parentNode) {
        const hp = document.createElement("div")
        hp.className = "hp"

        const bar = document.createElement("div")
        bar.className = "bar"
        bar.style.width = (this.hp[0] / this.hp[1] * 100) + "%"

        hp.appendChild(bar)
        parentNode.appendChild(hp)
    }

    startRoute(to, scene) {
        if ( this.route ) {
            this.route.to = to
        } else {
            this.route = {
                scene,
                from: this.pos,
                to,
                speed: this.speed,
                diagonalSpeedFactor: 1.4142135623730951,
            }

            this.routeMove()
        }
    }

    routeMove =() => {
        if ( !this.route ) { return }

        if ( this.route.tmt ) {
            clearTimeout(this.route.tmt)
        }

        const from = this.route.from
        const to = this.route.to

        const xDiff = Math.abs(to[0] - from[0])
        const yDiff = Math.abs(to[1] - from[1])

        if ( !xDiff && !yDiff ) {
            delete this.route
            return
        }

        const next = [ ...from ]

        let speed = this.route.speed

        if ( xDiff > yDiff+1 ) {
            next[0] += to[0] > from[0] ? +1 : -1
        } else if ( yDiff > xDiff+1 ) {
            next[1] += to[1] > from[1] ? +1 : -1
        } else if ( xDiff && yDiff ) {
            next[0] += to[0] > from[0] ? +1 : -1
            next[1] += to[1] > from[1] ? +1 : -1
            speed *= this.route.diagonalSpeedFactor
        } else if ( xDiff ) {
            next[0] += to[0] > from[0] ? +1 : -1
        } else { // yDiff
            next[1] += to[1] > from[1] ? +1 : -1
        }

        this.route.scene.setMoveSpeed(speed)
        this.route.scene.moveCurrentPlayer(next)

        this.route.from = next
        this.route.tmt = setTimeout(this.routeMove, speed * 1000)
    }
}
