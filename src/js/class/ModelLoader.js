//

import models from "const/models"

const DEFAULT_MODEL = "Default"

export default class {
    constructor() {
        this.models = {}
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

        for ( let cb of model.onLoad ) {
            cb(model)
        }

        delete model.loading
        delete model.onLoad
    }
}
