import _ from 'lodash';

export default (app, server, config) => {
  _.forEach(config.postStart, p => {
    p(app, server, config);
  });
};
