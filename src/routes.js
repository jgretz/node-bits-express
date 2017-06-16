import _ from 'lodash';
import express from 'express';

import {
  BEFORE_CONFIGURE_ROUTES, AFTER_CONFIGURE_ROUTES,
  BEFORE_EXECUTE_ROUTE, AFTER_EXECUTE_ROUTE,
  VERBS,
} from 'node-bits';

export default (app, config) => {
  const router = express.Router(); // eslint-disable-line

  const callHooks = (action, args) => {
    _.forEach(config.hooks, hook => {
      if (!hook[action]) {
        return;
      }

      hook[action](args);
    });
  };

  const args = {app, router, routes: config.routes, database: config.database};

  callHooks(BEFORE_CONFIGURE_ROUTES, args);

  _.forEach(config.routes, routeDefinition => {
    if (!routeDefinition) {
      return;
    }

    const {verb, route, implementation} = routeDefinition;

    // only accept certain verbs
    if (!verb || !VERBS.includes(verb.toUpperCase())) {
      return;
    }

    router[verb](route, (req, res) => {
      const requestArgs = {...args, routeDefinition, verb, req, res};
      callHooks(BEFORE_EXECUTE_ROUTE, requestArgs);

      implementation[verb](req, res);

      callHooks(AFTER_EXECUTE_ROUTE, requestArgs);
    });
  });

  callHooks(AFTER_CONFIGURE_ROUTES, args);

  app.use(router);
};
