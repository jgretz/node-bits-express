import _compression from 'compression';

export const compression = () => app => {
  app.use(_compression());
};
