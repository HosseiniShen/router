import {supportPushState, registerHook} from 'util/index.js'
import { assert } from './util';

class Router {
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
                // TODO
                break;
            case 'hash':
                // TODO
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

    }

    init () {
        
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

    go (n) {
        this.history.go(n)
    }
}