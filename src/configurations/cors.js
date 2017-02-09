import _cors from 'cors';

export const cors = (config) => (app) => {
  const cs = _cors(config);

  app.use(cs);
  app.options('*', cs);
};
