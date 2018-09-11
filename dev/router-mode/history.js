import {Base} from './base'

export class HTMLHistory extends Base {
    constructor (router) {
        super(router)
        window.addEventListener('popstate', () => {

        })
    }

    push (path) {
        this.transitionTo(path, () => {
            this.skip(`${this.router.base}${this.active.path}`)
        })
    }

    replace (path) {
        this.transitionTo(path, () => {
            this.skip(`${this.router.base}${this.active.path}`, true)
        })
    }

    skip (url, replaceFlag) {
        if (replaceFlag) {
            window.history.replaceState({}, '', url)
        } else {
            window.history.pushState({}, '', url)
        }
    }
    
}