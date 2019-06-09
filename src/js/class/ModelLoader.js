//

import models from "const/models"

const DEFAULT_MODEL = "Default"

export default class {
    constructor() {
        this.models = {}
    }

    getModelByName(name) {
        return models[name]
    }

    load(name, cb) {
        const model = models[name] || models[DEFAULT_MODEL]

        if ( model.loaded ) {
            cb(model)
        } else if ( model.loading ) {
            model.onLoad.push(cb)
        } else { // init loading
            model.loading = true

            model.onLoad = model.onLoad || []
            model.onLoad.push(cb)

            this.fetch(model)
        }
    }

    async fetch(model) {
        const r = await fetch(model.url)
        const svg = await r.text()

        model.loaded = true
        model.svg = svg

        // https://measurethat.net/Benchmarks/Show/4866/0/svg-parsing
        const parser = new DOMParser
        const node = parser.parseFromString(svg, "image/svg+xml")

        model.svgNode = node && node.firstChild

        if ( model.svgNode ) {
            model.svgNodeWear = model.svgNode.cloneNode(true)
            model.svgNodeWear
                .querySelectorAll("._back, ._back2")
                .forEach(node => node.remove())
        }

        model.viewBox = model.svgNode.getAttribute("viewBox").split(" ")

        for ( let cb of model.onLoad ) {
            cb(model)
        }

        delete model.loading
        delete model.onLoad
    }
}
