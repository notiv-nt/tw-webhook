/**
 * {
 *   [auth_key]: { id: Order },
 * }
 */

const items = {};

export default (app) => {
  app.get('/o/:auth', (req, res) => res.json(Object.values(items[req.params.auth] || {})));

  app.post('/o/:auth', (req, res) => {
    const item = getItem(req.params.auth, req.body.ticket);

    // create new
    if (!item) {
      items[req.params.auth][req.body.ticket] = req.body;
      return res.json(null);
    }

    // update old
    if (item._emit_time <= req.body._emit_time) {
      items[req.params.auth][req.body.ticket] = req.body;
    }

    return res.json(null);
  });

  app.delete('/o/:auth/:id', (req, res) => {
    try {
      delete items[req.params.auth][req.params.id];
    } catch (e) {}
    res.json(null);
  });
};

function getItem(auth, id) {
  if (!items[auth]) {
    items[auth] = {};
  }
  return items[auth][id] || null;
}
