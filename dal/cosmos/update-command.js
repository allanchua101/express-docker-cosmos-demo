const { CosmosClient } = require("@azure/cosmos");
const { dbURI, dbKey, dbName, container } = require("config");
const HttpStatusCodes = { NOTFOUND: 404 };

// Private Methods
let buildClient = () => {
  return new CosmosClient({
    endpoint: dbURI,
    auth: { masterKey: dbKey }
  });
}

/**
 * @module updateItemCommand.
 * @description Module that enables you to update
 *              items from a Cosmos DB collection.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 11, 2018
 */
module.exports = {
  /**
   * @async 
   * @function execute
   * @description Method used for updating an item 
   *              from a Cosmos DB collection.
   * 
   * @param {Object} item - The item to remove from the collection.
   * @param {number} item.id - The id of the product.
   * @param {number} item.name - The name of the product.
   * 
   * @return Promise<void>
   */
  async execute(item) {
    try {
      await buildClient()
        .database(dbName)
        .container(container)
        .item(item.id)
        .replace(item);
    } catch (error) {
      if (error.code === HttpStatusCodes.NOTFOUND) {
        console.log(
          `Target item do not exists.: ${error.message}`
        );
      } else {
        throw error;
      }
    }
  }
}