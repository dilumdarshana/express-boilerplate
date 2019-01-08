'use strict';

const express = require('express');
const config = require('config');

/**
 * Router base class; all routers should extends from this
 */
class Router {
    constructor() {
        this.router = express.Router();
        this.register(this.routes, this.middlewares);
    }

    get middlewares() {
        return [];
    }

    get routes() {
        return [];
    }

    register(routes, middlewares) {
        for (let [verb, path, methodName, routeMiddlewares = []] of routes) {
            verb = verb.toLowerCase();
            this.router[verb](`${config.api_prefix}${path}`, [...middlewares, ...routeMiddlewares], this[methodName].bind(this))
        }
    }
}

module.exports = Router;
