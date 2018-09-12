import {supportPushState, registerHook} from 'util/index.js'
import {HashHistory} from './router-mode/hash'
import {HTMLHistory} from './router-mode/history'
import { assert } from './util';
import Observer from './observer/observer';
import Watcher from './observer/watcher';

export default class Router {
    constructor (options) {
        this.beforeHooks = []
        this.afterHooks = []
        this.routes = options.routes
        this.mode = options.mode || 'hash'
        this.base = options.base
        this.container = this.el ?
            document.querySelector(this.el) :
            document.body.appendChild(document.createElement('div'))

        if (this.mode === 'history' && !supportPushState) {
            this.mode === 'hash'
        }

        switch (this.mode) {
            case 'history':
                this.history = new HTMLHistory(this)
                break;
            case 'hash':
                this.history = new HashHistory(this)
                break;
            default:
                assert(false, `Invalid Router Mode: ${this.mode}`)
        }

        Object.defineProperty(this, 'route', {
            get () {
                return this.history.active
            }
        })

        this.init()
    }

    render () {
        this.container.innerHTML = this.history.active.route.component
    }

    init () {
        const history = this.history
        const observer = new Observer(this.history.active)
        const watcher = new Watcher(this.history.active, 'route', this.render.bind(this))
    }

    beforeEach (fn) {
        registerHook(this.beforeHooks, fn)
    }

    afterEach () {
        registerHook(this.afterHooks, fn)
    }

    push (location) {
        this.history.push(location)
    }

    replace (location) {
        this.history.replace(location)
    }

    // go (n) {
    //     this.history.go(n)
    // }
}