/**
 * {
 *   [auth_key]: any[],
 * }
 */

const items = {};

export default (app) => {
  app.get('/o/:auth', (req, res) => res.json(items[req.params.auth] || []));

  app.post('/o/:auth', (req, res) => {
    items[req.params.auth] = req.body;
    return res.json(null);
  });
};
