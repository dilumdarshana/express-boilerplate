const express = require('express');
const config = require('config');

/**
 * Router base class; all routers should extends from this
 */
class Router {
    constructor() {
        this.router = express.Router();
        this.register(this.routes, this.middleware);
    }

    get middleware() {
        return [];
    }

    get routes() {
        return [];
    }

    register(routes, middleware) {
        for (let [verb, path, methodName, routeMiddleware = []] of routes) {
            verb = verb.toLowerCase();
            this.router[verb](`${config.api_version_prefix}${path}`, [...middleware, ...routeMiddleware], this[methodName].bind(this));
        }
    }
}

module.exports = Router;
