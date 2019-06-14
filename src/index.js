import express from 'express';

import configure from './configure';
import routes from './routes';
import postStart from './postStart';

// compile
const compileConfiguration = (options = {}, bitsConfig) => ({
  port: options.port || 3000,
  configurations: options.configurations || [],
  postStart: options.postStart || [],

  schema: bitsConfig.schema,
  routes: bitsConfig.routes,

  hooks: options.hooks || [],
  database: bitsConfig.database,
});

// create bit
const initializeServer = options => bitsConfig => {
  const config = compileConfiguration(options, bitsConfig);

  // create and configure the app
  const app = express();

  configure(app, config);
  routes(app, config);

  // start the server
  const server = app.listen(process.env.PORT || config.port);

  postStart(app, server, config);
};

// export server
export default options => ({
  initializeServer: initializeServer(options),
});

// export oob configurations
export * from './configurations';
