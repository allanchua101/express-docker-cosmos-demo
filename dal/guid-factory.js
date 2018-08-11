
/**
 * @module guidFactory.
 * @description Module that enables you to buid guid strings.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 11, 2018
 */
module.exports = {
  /**
   * @function execute
   * @description Method used for building a guid string.
   * 
   * @returns {string} A guid in string format.
   */
  execute() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }
};