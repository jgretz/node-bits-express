import _ from 'lodash';
import express from 'express';

const BEFORE = 'before';
const AFTER = 'after';

export default (app, config) => {
  var router = express.Router();

  _.forEach(config.routes, (routeDefinition) => {
    const { verb, route, implementation } = routeDefinition;

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
