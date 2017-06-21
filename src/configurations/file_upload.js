import _fileUpload from 'express-fileupload';

export const fileUpload = (config = {}) => app => {
  app.use(_fileUpload(config));
};
