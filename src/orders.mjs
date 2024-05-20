/**
 * {
 *   [auth_key]: Order[],
 * }
 */

import { nanoid } from 'nanoid';

const items = {};

export default (app) => {
  app.post('/o/:auth', (req, res) => {
    ensureArr(req.params.auth);

    items[req.params.auth].push({ _id: nanoid(30), ...req.body });
    res.send('');
  });

  app.get('/o/:auth/', (req, res) => {
    ensureArr(req.params.auth);
    res.send(items[req.params.auth]);
  });

  app.get('/o/:auth/shift', (req, res) => {
    ensureArr(req.params.auth);
    res.send(items[req.params.auth][0] || null);
  });

  app.delete('/o/:auth/:id', (req, res) => {
    ensureArr(req.params.auth);
    items[req.params.auth] = req.params.auth.filter((i) => i._id !== req.params.id);
    res.send('');
  });
};

function ensureArr(key) {
  if (!items[key]) {
    items[key] = [];
  }
}