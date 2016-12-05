import _ from 'lodash';

export default (app, config) => {
  _.forEach(config.configs, (c) => { c(app, config); });
};
