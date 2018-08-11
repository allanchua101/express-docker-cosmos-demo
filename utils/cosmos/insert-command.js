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
 * @module insertItemCommand.
 * @description Module that enables you to insert 
 *              items to a Cosmos DB collection.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 11, 2018
 */
module.exports = {
  /**
   * @async 
   * @function execute
   * @description Method used for adding an item to a collection.
   * 
   * @param {Object} item - The item to add in the collection.
   * @param {number} id - The id of the product.
   * @param {string} name - The name of the product.
   * 
   * @return Promise<void>
   */
  async execute(item) {
    try {
      await buildClient()
              .database(dbName)
              .container(container)
              .items.create(item);
    } catch (error) {
      console.log(
        `Item addition to client failed: ${error.message}`
      );
    }
  }
}