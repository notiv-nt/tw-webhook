const items = {
  // [auth_key]: {
  //   [source]: any[]
  // }
};

export default (app) => {
  app.get('/o/:auth', (req, res) => res.json(items[req.params.auth] || []));

  app.post('/o/:auth/:source', (req, res) => {
    if (!items[req.params.auth]) {
      items[req.params.auth] = {};
    }
    items[req.params.auth][req.params.source] = req.body;
    return res.json(null);
  });
};
