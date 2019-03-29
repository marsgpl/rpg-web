//

import Figure from "class/Figure"
import {div} from "lib/helper"

const LEVEL = 1
const HP = [1,1]
const SPEED = 1 // more - slower, seconds to move from one tile to another

const DIAGONAL_SPEED_FACTOR = 1.4142135623730951

export default class extends Figure {
    constructor(props) {
        super(props)

        this.name = props.name || this.model
        this.level = props.level || LEVEL
        this.hp = props.hp || HP
        this.speed = props.speed || SPEED

        this.needRenderHp = false

        this.classes.push("unit")
    }

    renderDetails(parentNode) {
        this.renderName(parentNode)

        if ( this.needRenderHp && this.hp[0] !== this.hp[1] ) {
            this.renderHp(parentNode)
        }
    }

    renderName(parentNode) {
        const name = div()

        name.className = "name"
        name.textContent = this.name

        parentNode.appendChild(name)
    }

    renderHp(parentNode) {
        const hp = div()
        hp.className = "hp"

        const bar = div()
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
            }

            this.routeMove()
        }
    }

    routeMove =() => {
        if ( !this.route ) { return }

        if ( this.route.tmt ) {
            this.moving = false
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
            speed *= DIAGONAL_SPEED_FACTOR
        } else if ( xDiff ) {
            next[0] += to[0] > from[0] ? +1 : -1
        } else { // yDiff
            next[1] += to[1] > from[1] ? +1 : -1
        }

        const xi = next[0] - from[0]
        const yi = next[1] - from[1]

        let angle
            = (xi==1&&yi==1) ? "e"
            : (xi==-1&&yi==-1) ? "w"
            : (xi==1&&yi==-1) ? "n"
            : (xi==-1&&yi==1) ? "s"
            : xi==1 ? "ne"
            : xi==-1 ? "sw"
            : yi==1 ? "se"
            : yi==-1 ? "nw"
            : "s"

        this.moving = true

        this.route.scene.setMoveSpeed(speed)
        this.route.scene.moveCurrentPlayer(next, angle)

        this.route.from = next
        this.route.tmt = setTimeout(this.routeMove, speed * 1000)
    }
}
