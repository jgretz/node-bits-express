import express from 'express';

import configure from './configure';
import applyRoutes from './routes';
import defaultConfigurations from './configurations';

// compile
const compileConfiguration = (options = {}, bitsConfig) => {
  const configurations = options.skipDefaultConfiguration ? [] : defaultConfigurations;

  return {
    port: options.port || 3000,
    configs: [...configurations, ...(options.configs || [])],

    schema: bitsConfig.schema,
    routes: bitsConfig.routes,
  };
};

// create bit
const initializeServer = (options) =>
  (bitsConfig) => {
    const config = compileConfiguration(options, bitsConfig);

    // create and configure the app
    const app = express();

    configure(app, config);
    applyRoutes(app, config);

    // start the server
    app.listen(process.env.PORT || config.port);
  };


export default (options) =>
({
   initializeServer: initializeServer(options),
});
