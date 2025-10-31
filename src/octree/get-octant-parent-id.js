import { validateU126 } from './octree-validators.js';

/** #### Returns the ID of the parent of an octant with the given ID
 * - The children of an octant can be found using getOctantChildIds()
 * - In the special case of zero, the first child is a cyclical reference back
 *   to zero (it is its own parent)
 * @param {BigInt} octantId The octant ID (an integer, 0 to 2^126-1)
 * @returns {BigInt} The parent octant ID (an integer, 0 to 2^123-1
 */
export const getOctantParentId = (octantId) => {
  validateU126(octantId, 'getOctantParentId(): octantId');

  // Divide by 8 to get the parent ID, shared by all its children.
  const parentId = octantId >> 3n;

  return parentId;
}
