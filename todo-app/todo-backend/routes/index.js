const express = require('express');
const router = express.Router();
const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  let added_todos = await redis.get("added_todos")
  res.send({"added_todos" : added_todos})
})

module.exports = router;
