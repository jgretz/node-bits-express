const defaultConfig = {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE, OPTIONS',
  headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

export const accessControl = (config = {}) => app => {
  const ops = {...defaultConfig, ...config};

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ops.origin);
    res.header('Access-Control-Allow-Methods', ops.methods);
    res.header('Access-Control-Allow-Headers', ops.headers);
    next();
  });
};
