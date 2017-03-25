import _ from 'lodash';
import _bodyParser from 'body-parser';

export const bodyParser = (config = {}) => app => {
  _.extend(config, {type: 'application/json'});
  app.use(_bodyParser.json(config));
};
