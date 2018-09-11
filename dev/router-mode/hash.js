import {Base} from './base.js'
import {supportPushState} from '../util/index'

export class HashHistory extends Base {
    constructor (router) {
        super(router)
        this.ensureSlash()
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getHash())
        })
    }

    push (path) {
        this.transitionTo(path, () => {
            this.pushHash(path)
        })
    }

    replace (path) {
        this.transitionTo(path, () => {
            this.replaceHash(path)
        })
    }

    ensureSlash () {
        let path = this.getHash()
        if (path.charAt(0) === '/') {
            return true
        }
        this.replaceHash(path)
        return false
    }

    getHash () {
        let href = window.location.href
        let index = href.indexOf('#')
        return index >= 0 ? href.slice(index+1) : ''
    }

    getUrl (path) {
        let href = window.location.href
        let index = href.indexOf('#')
        let base = index >= 0 ? href.slice(0, index) : href
        return `${base}#/${path}`
    }

    replaceHash (path) {
        let url = this.getUrl(path)
        if (supportPushState) {
            window.history.replaceState({}, '', url)
        } else {
            window.location.replace(url)
        }
    }

    pushHash (path) {
        let url = this.getUrl(path)
        if (supportPushState) {
            window.history.pushState({}, '', url)
        } else {
            window.location.assign(url)
        }
    }

}