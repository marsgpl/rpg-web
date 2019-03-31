//

export function rnd(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

export function div() {
    return document.createElement("div")
}

export function evl(node, eventName, cb) {
    node.addEventListener(eventName, cb)
}

export function purge(node) {
    let first

    while ( first = node.firstChild ) {
        node.removeChild(first)
    }
}

export function svg() {
    return document.createElementNS("http://www.w3.org/2000/svg", "svg")
}
