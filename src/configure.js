import _ from 'lodash';

export default (app, config) => {
  _.forEach(config.configurations, c => {
    c(app, config);
  });
};
