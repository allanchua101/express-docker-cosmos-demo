var express = require('express');
var router = express.Router();

/* Post a product. */
router.post('/add', async (req, res, next) => {
  let isItemAdded = false;
  let id = null;

  console.log("/products/add executing..");

  try {
    const insertCommand = require("../utils/cosmos/insert-command");
    const guidFactory = require("../utils/guid-factory");

    id = guidFactory.execute();

    await insertCommand.execute({
      id: id,
      name: req.body.name
    });
  } catch (error) {
    console.log("Item addition to client failed: " + error.message)
  }

  res.status(200).json({
    isSuccess: isItemAdded,
    id: id
  });
});

module.exports = router;
