import { validateU123 } from './octree-validators.js';

/** #### Returns the IDs of the 8 children of an octant with the given ID
 * - The parent of an octant can be found using getParentOctantId()
 * - In the special case of zero, the first child is a cyclical reference back
 *   to zero (it is its own parent)
 * @param {BigInt} octantId_u123 The octant ID (an integer, 0 to 2^123-1)
 * @returns {BigInt[]} Array of 8 child octant IDs in the range 0 to 2^126-1
 */
export const getChildOctantIds = (octantId_u123) => {
  validateU123(octantId_u123, 'getChildOctantIds(): octantId_u123');

  // Multiply by 8 to get the shared part of the child IDs.
  const siblingSharedId = octantId_u123 << 3n;

  // Generate the 8 child IDs by adding the sibling index (0 to 7).
  const children = [];
  for (let siblingIndex = 0n; siblingIndex < 8n; siblingIndex++) {
    children.push(siblingSharedId | siblingIndex);
  }
  return children;
}
