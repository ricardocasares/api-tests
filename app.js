const db = require(`./db/${process.env.NODE_ENV}`);
const app = require("express")();

module.exports = app
  .get("/users", (_, res) => res.json(db))
  .get("/users/:id", (req, res) => {
    if (!db[req.params.id]) return res.status(404).send('Not found');

    res.json(db[req.params.id]);
  })
  .delete("/users/:id", (req, res) => {
    db.splice(req.params.id);
    res.status(204).send();
  });
