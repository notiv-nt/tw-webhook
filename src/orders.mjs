const items = {
  // [any_key]: any[]
};

export default (app) => {
  app.get('/o/:path(*)', (req, res) => res.json(items[req.params.path] || []));

  app.post('/o/:path(*)', (req, res) => {
    items[req.params.path] = req.body;
    return res.json(null);
  });
};
