//

export default class {
    constructor(rootNode, scale = 1) {
        this.node = rootNode

        const css = getComputedStyle(this.node)

        this.width = parseInt(css.width)
        this.height = parseInt(css.height)

        this.scenes = {}
        this.nextSceneIndex = 1

        this.node.addEventListener("click", this.onClick)
    }

    addScene(sceneId, scene) {
        this.scenes[sceneId] = scene
        scene.zIndex = this.nextSceneIndex++
    }

    renderScene(sceneId) {
        this.currentScene = this.scenes[sceneId]

        if ( !this.currentScene ) {
            throw `Scene not found by id: "${sceneId}"`
        }

        this.purgeContent(this.node)

        this.currentScene.render(
            this.node,
            this.width,
            this.height,
            sceneId,
        )
    }

    purgeContent(node) {
        let first

        while ( first = node.firstChild ) {
            node.removeChild(first)
        }
    }

    onClick = e => {
        if ( this.currentScene ) {
            const pos = this.currentScene.getTilePosByMouse(
                e.pageX - this.width/2,
                e.pageY - this.height/2,
            )

            this.currentScene.currentPlayerStartRoute(pos)
        }
    }
}
