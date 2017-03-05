import express from 'express';

import configure from './configure';
import routes from './routes';

// compile
const compileConfiguration = (options = {}, bitsConfig) =>
  ({
    port: options.port || 3000,
    configurations: options.configurations || [],

    schema: bitsConfig.schema,
    routes: bitsConfig.routes,

    hooks: options.hooks || [],
    database: bitsConfig.database,
  });

// create bit
const initializeServer = options =>
  bitsConfig => {
    const config = compileConfiguration(options, bitsConfig);

    // create and configure the app
    const app = express();

    configure(app, config);
    routes(app, config);

    // start the server
    app.listen(process.env.PORT || config.port);
  };

// export server
export default options =>
({
  initializeServer: initializeServer(options),
});

// export oob configurations
export * from './configurations';
