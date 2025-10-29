import { validateU126 } from './validators.js';

/** #### Returns the depth of a node
 * - The special case of node zero returns 1, though it has two depths - 0 and 1.
 * @param {BigInt} nodeId_u126 The node ID (must be an integer, 0 to 2^126-1)
 * @returns {number} The depth of the node (1 to 42)
 */
export const getNodeLevel = (nodeId_u126) => {
  validateU126(nodeId_u126, 'getNodeLevel(): nodeId_u126');

  // Special case for zero.
  if (nodeId_u126 === 0n) return 1;

  // Efficiently find the highest set bit position, which determines the level.
  // We step through the bits in chunks of 3 bits (since it's an octree).
  let level = 0;
  let id = nodeId_u126;
  while (id > 0n) {
    level++;
    id >>= 3n;
  }
  return level;
}
