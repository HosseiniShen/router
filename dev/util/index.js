export const inBroswer = typeof window !== 'undefined'
export const UA = inBroswer && window.navigator.userAgent.toLowerCase()
export const supportPushState = inBroswer && window.history && 'pushState' in window.history

/**
 * 断言
 * @param {Boolean} codition
 * @param {String}  message
*/
export const assert = function (codition, message) {
    if (!codition) {
        throw new Error(`${message}`)
    }
}

/**
 * 匹配路由
 * @param {String}  route
 * @param {Object}  routeMap
*/
export const routeMatch = function (route, routeMap) {
    let match = null;
    route = typeof route === 'string' ? {path: route} : route;
    for (let routeItem of routeMap) {
        if (route.path === routeItem.path || (route.name && route.name === routeItem.name)) {
            match = route;
            if (route.query) {
                match.query = path.query
            }
            break;
        }
    }
    if (match === null) {
        assert(false, `route with name "${route.name || route,path}" does not exist`)
    }
    return match
}

/**
 * 注册钩子
 * @param {Array} list
 * @param {Function}  fn
*/
export const registerHook = function (list, fn) {
    list.push(fn)
    return function () {
        if (list.indexOf(fn) > -1) {
            list.splice(i, 1)
        }
    }
}

/**
 * 获取query对象
 * @param {String} path
*/
export const parseQuery = function (path) {
    let query = {}
    path = decodeURIComponent(path)
    path = path.substring(path.indexOf('?') + 1)
    return path.split('&').forEach((item) => {
        let queryArr = item.split('=')
        query[queryArr[0]] = queryArr[1]
    })
    return query
}