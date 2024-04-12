// ----------
/**
 * {
 *   [auth_key]: {
 *      [order_id]: Order
 *   }
 * }
 */
const items = {};

module.exports = (app) => {
  app.post('/o/:id', (req, res) => {
    const auth = req.headers['x-auth'];
    if (!items[auth]) {
      items[auth] = {};
    }
    const existedItem = items[auth][req.params.id];

    if (existedItem?.close_time && req.body?.close_time) {
      try {
        if (new Date(req.body.close_time).getTime() > new Date(existedItem.close_time).getTime()) {
          items[auth][req.params.id] = req.body;
        }
      } catch (e) {}
    } else {
      items[auth][req.params.id] = req.body;
    }

    res.send('');
  });

  app.get('/o', (req, res) => {
    const auth = req.headers['x-auth'];
    if (!items[auth]) {
      return res.send([]);
    }
    res.send(Object.values(items[auth]));
  });

  app.delete('/o/:id', (req, res) => {
    const auth = req.headers['x-auth'];
    if (items[auth]) {
      delete items[auth][req.params.id];
    }
    res.send('');
  });
};
