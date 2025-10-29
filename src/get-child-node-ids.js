import { validateU123 } from './validators.js';

/** #### Returns the IDs of the 8 children of a node with the given ID
 * - The parent of a node can be found using getParentNodeId()
 * - In the special case of zero, the first child is a cyclical reference back
 *   to zero (it is its own parent)
 * @param {BigInt} nodeId_u123 The node ID (an integer, 0 to 2^123-1)
 * @returns {BigInt[]} Array of 8 child node IDs in the range 0 to 2^126-1
 */
export const getChildNodeIds = (nodeId_u123) => {
  validateU123(nodeId_u123, 'getChildNodeIds(): nodeId_u123');

  // Multiply by 8 to get the shared part of the child IDs.
  const siblingSharedId = nodeId_u123 << 3n;

  // Generate the 8 child IDs by adding the sibling index (0 to 7).
  const children = [];
  for (let siblingIndex = 0n; siblingIndex < 8n; siblingIndex++) {
    children.push(siblingSharedId | siblingIndex);
  }
  return children;
}
