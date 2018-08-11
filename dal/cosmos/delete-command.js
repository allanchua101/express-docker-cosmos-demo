const { CosmosClient } = require("@azure/cosmos");
const { dbURI, dbKey, dbName, container } = require("config");

// Private Methods
let buildClient = () => {
  return new CosmosClient({
    endpoint: dbURI,
    auth: { masterKey: dbKey }
  });
}

/**
 * @module deleteItemCommand.
 * @description Module that enables you to delete 
 *              items from a Cosmos DB collection.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 11, 2018
 */
module.exports = {
  /**
   * @async 
   * @function execute
   * @description Method used for deleting an item 
   *              from a Cosmos DB collection.
   * 
   * @param {Object} item - The item to remove from the collection.
   * @param {number} item.id - The id of the product.
   * 
   * @return Promise<void>
   */
  async execute(item) {
    try {
      await buildClient()
              .database(dbName)
              .container(container)
              .item(item.id)
              .delete(item);
    } catch (error) {
      console.log(
        `Item addition to client failed: ${error.message}`
      );
    }
  }
}