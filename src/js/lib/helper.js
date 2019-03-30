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
