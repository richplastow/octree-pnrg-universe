import { validateU126 } from './octree-validators.js';

/** #### Returns the depth of an octant
 * - The special case of octant zero returns 1, though it has two depths - 0 and 1.
 * @param {BigInt} octantId_u126 The octant ID (must be an integer, 0 to 2^126-1)
 * @returns {number} The depth of the octant (1 to 42)
 */
export const getOctantLevel = (octantId_u126) => {
  validateU126(octantId_u126, 'getOctantLevel(): octantId_u126');

  // Special case for zero.
  if (octantId_u126 === 0n) return 1;

  // Efficiently find the highest set bit position, which determines the level.
  // We step through the bits in chunks of 3 bits (since it's an octree).
  let level = 0;
  let id = octantId_u126;
  while (id > 0n) {
    level++;
    id >>= 3n;
  }
  return level;
}
