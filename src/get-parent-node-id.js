import { validateU126 } from './validators.js';

/** #### Returns the ID of the parent of a node with the given ID
 * - The children of a node can be found using getChildNodeIds()
 * - In the special case of zero, the first child is a cyclical reference back
 *   to zero (it is its own parent)
 * @param {BigInt} nodeId_u126 The node ID (an integer, 0 to 2^126-1)
 * @returns {BigInt} The parent node ID (an integer, 0 to 2^123-1
 */
export const getParentNodeId = (nodeId_u126) => {
  validateU126(nodeId_u126, 'getParentNodeId(): nodeId_u126');

  // Divide by 8 to get the parent ID, shared by all its children.
  const parentId = nodeId_u126 >> 3n;

  return parentId;
}
