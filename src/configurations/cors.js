import _cors from 'cors';

export const cors = config => app => {
  app.use(_cors(config));
};
