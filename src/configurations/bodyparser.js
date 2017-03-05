import _bodyParser from 'body-parser';

export const bodyParser = app => {
  app.use(_bodyParser.json({type: 'application/json'}));
};
