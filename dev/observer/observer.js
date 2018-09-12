import Dep from './dep'

export default class Observer {
    constructor (data) {
        this.walk(data)
    }

    walk (data) {
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            // 这里没有对数组进行处理
            if (Object.prototype.toString.apply(data[keys[i]]) === '[object Object]') {
                this.walk(data[keys[i]])
            }
            defineReactive(data, keys[i], data[keys[i]])
        }
    }

}

function defineReactive (data, key, value) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get () {
            if (Dep.target) {
                dep.addDep()
            }
            return value;
        },

        set (newValue) {
            if (newValue === value) {
                return
            }
            value = newValue
            dep.notify()
        }

    })
}