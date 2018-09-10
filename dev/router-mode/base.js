import {matchRoute, parseQuery} from './util/index'

class Base {
    constructor (router) {
        this.router = router
        this.active = {
            name: '',
            path: '',
            query: {},
            route: {},
            meta: {}
        }
    }

    transitionTo (target, cb) {
        const targetRoute = matchRoute(target, this.router.routes)
        confirmTransition(targetRoute, () => {
            this.active.route = targetRoute
            this.active.name = targetRoute.name
            this.active.path = targetRoute.path
            this.active.meta = targetRoute.meta
            this.active.query =  targetRoute.query || parseQuery(targetRoute.path)
            cb && cb()
        })
    }

    confirmTransition (route, cb) {
        let queue = [].concat(
            this.router.beforeHooks,
            this.active.route.beforeLeave,
            route.beforeEnter,
            route.afterEnter
        )
        runQueue(queue, cb)
    }

    runQueue (queue, cb) {
        const step = function (index) {
            if (index >= queue.length) {
                cb && cb()
            } else {
                if (queue[index]) {
                    queue[index]()
                }
                step(index + 1)
            }
        }
        step(0);
    }

}