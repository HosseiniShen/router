import { setTarget, clearTarget } from "./dep";

export default class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm
        this.cbs = []
        this.expression
        this.cbs.push(cb)
        this.value = this.get()
    }

    get () {
        setTarget(this)
        let value = this.vm
        this.expression.split('.').forEach((key) => {
            value = value[key]
        })
        clearTarget()
        return value
    }

    update () {
        this.cbs.forEach((cb) => {
            cb && cb();
        })
    }
}