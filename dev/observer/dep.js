export class Dep {
    constructor () {
        this.depends = []
    }

    addDep () {
        this.depends.push(Dep.target)
    }

    notify () {
        this.depends.forEach((watcher) => {
            watcher.update()
        })
    }

}

Dep.target = null

export function setTarget (watcher) {
    Dep.target = watcher
}

export function clearTarget () {
    Dep.target = null
}