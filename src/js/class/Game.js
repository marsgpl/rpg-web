//

import {evl,purge} from "lib/helper"

export default class {
    constructor(rootNode, dataLayer, modelLoader) {
        this.node = rootNode
        this.dataLayer = dataLayer
        this.modelLoader = modelLoader

        const css = getComputedStyle(this.node)

        this.width = parseInt(css.width)
        this.height = parseInt(css.height)

        this.scenes = {}
        this.nextSceneIndex = 1

        evl(this.node, "click", this.onClick)
    }

    addScene(sceneId, scene) {
        this.scenes[sceneId] = scene
        scene.zIndex = this.nextSceneIndex++
        scene.game = this
    }

    renderScene(sceneId) {
        this.currentScene = this.scenes[sceneId]

        if ( !this.currentScene ) {
            throw `Scene not found by id: "${sceneId}"`
        }

        purge(this.node)

        this.currentScene.render(
            this.node,
            this.width,
            this.height,
            sceneId,
        )
    }

    onClick = e => {
        if ( this.currentScene ) {
            const pos = this.currentScene.mousePosToTilePos(e.pageX, e.pageY)

            if ( e.metaKey ) {
                console.log(pos)
            } else {
                this.currentScene.currentPlayerStartRoute(pos)
            }
        }
    }
}
