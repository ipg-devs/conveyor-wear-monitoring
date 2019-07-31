const Router = require("express-promise-router");

const bwmsRepo = require('../../external/bwmsRepo');

const router = new Router();

module.exports = router
  .get('/', async (req, res) => {
    const rows = await bwmsRepo.getData();

    res.send(rows)
  })
  .get('/all', async (req, res) => {
    const { rows } = await bwmsRepo.getallData();

    res.send(rows)
  })
  // .get('/delete', async (req, res) => {
  //   const { rows } = await bwmsRepo.deleteData();

  //   res.send(rows)
  // })
