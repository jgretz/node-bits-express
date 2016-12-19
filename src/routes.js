import _ from 'lodash';
import express from 'express';

const BEFORE = 'before';
const AFTER = 'after';
const VERBS = ['get','put','post','delete'];

export default (app, config) => {
  var router = express.Router();

  _.forEach(config.routes, (routeDefinition) => {
    const { verb, route, implementation } = routeDefinition;

    // only accept certain verbs
    if (!verb || !VERBS.includes(verb.toLowerCase())) {
      return;
    }

    router[verb](route, (req, res) => {
      if (implementation[BEFORE]) {
        implementation[BEFORE](req, res);
      }

      implementation[verb](req, res);

      if (implementation[AFTER]) {
        implementation[AFTER](req, res);
      }
    });
  });

  app.use(router);
};
