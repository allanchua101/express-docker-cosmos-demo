var express = require('express');
var router = express.Router();

router.post('/add', async (req, res, next) => {
  let isItemAdded = false;
  let id = null;

  console.log("/products/add executing..");

  try {
    const insertCommand = require("../dal/cosmos/insert-command");
    const guidFactory = require("../dal/guid-factory");

    id = guidFactory.execute();

    await insertCommand.execute({
      id: id,
      name: req.body.name
    });

    isItemAdded = true;
  } catch (error) {
    console.log("Item addition from client failed: " + error.message)
  }

  res.status(200).json({
    isSuccess: isItemAdded,
    id: id
  });
});

router.post('/delete', async (req, res, next) => {
  let isDeleted = false;

  try {
    const deleteCommand = require("../dal/cosmos/delete-command");

    await deleteCommand.execute({ id: req.body.id });

    isDeleted = true;
  } catch (error) {
    console.log("Item deletion from collection failed: " + error.message)
  }

  res.status(200).json({
    isSuccess: isDeleted
  });
});

router.post('/update', async (req, res, next) => {
  let isUpdated = false;

  try {
    const updateCommand = require("../dal/cosmos/update-command");

    await updateCommand.execute({
      id: req.body.id,
      name: req.body.name
    });

    isUpdated = true;
  } catch (error) {
    console.log("Item update from collection failed: " + error.message)
  }

  res.status(200).json({
    isSuccess: isUpdated
  });
});

router.get('/get-by-id', async (req, res, next) => {
  let responseData = null;

  try {
    const getByIDQuery = require("../dal/cosmos/get-by-id-query");

    responseData = await getByIDQuery.execute({ id: req.query.id });
  } catch (error) {
    console.log("Item retrieval failed.: " + error.message)
  }

  res.status(200).json({
    product: responseData
  });
});

module.exports = router;
