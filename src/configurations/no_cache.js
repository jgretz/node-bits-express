export const noCache = (config = {}) => app => {
  app.use((req, res, next) => {
    const api = config.api ? config.api : '/api/';

    if(req.url.startsWith(api)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
    }

    next();
  });
};