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
 * @description Module that enables you to get products by their IDs.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 11, 2018
 */
module.exports = {
  /**
   * @typedef Product
   * @property {number} item.id - The id of the product.
   * @property {string} item.name - The name of the product.
   */

  /**
   * @async 
   * @function execute
   * @description Method used for retrieving an item from the collection.
   * 
   * @param {Object} params - The parameter object.
   * @param {number} params.id - The id of the product.
   * 
   * @return Promise<Product> Product instance.
   */
  async execute(params) {
    try {
      const querySpec = {
        query: "SELECT r.id, r.name FROM root r WHERE r.id = @id",
        parameters: [
          {
            name: "@id",
            value: params.id
          }
        ]
      };

      let { result } = await buildClient()
        .database(dbName)
        .container(container)
        .items
        .query(querySpec)
        .toArray();

      return result[0];
    } catch (error) {
      console.log(
        `Item addition to client failed: ${error.message}`
      );
    }

    return null;
  }
}