import { validateU126 } from './octree-validators.js';

/** #### Returns the IDs of the 8 children of an octant with the given ID
 * - The parent of an octant can be found using getOctantParentId()
 * - Returns an array of zeroes for a leaf node octant, which has no children
 * - In the special case of zero, the first child is a cyclical reference back
 *   to zero (it is its own parent)
 * @param {BigInt} octantId The octant ID (an integer, 0 to 2^126-1)
 * @returns {[BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt]}
 *     Array of 8 child octant IDs in the range 0 to 2^126-1
 * @throws If the input octant ID is out of range
 */
export const getOctantChildIds = (octantId) => {
    validateU126(octantId, 'getOctantChildIds(): octantId');

    // Leaf node octants have no children - signify this with an array of zeroes.
    const firstLeafNodeId = 2n ** 123n;
    if (octantId >= firstLeafNodeId) return [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];

    // Multiply by 8 to get the shared part of the child IDs.
    const siblingSharedId = octantId << 3n;

    // Generate the 8 child IDs by adding the sibling index (0 to 7).
    // Slightly faster than using a loop, and makes typing cleaner.
    /** @type {[BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt]} */
    const children = [
      siblingSharedId | 0n,
      siblingSharedId | 1n,
      siblingSharedId | 2n,
      siblingSharedId | 3n,
      siblingSharedId | 4n,
      siblingSharedId | 5n,
      siblingSharedId | 6n,
      siblingSharedId | 7n,
    ];
    return children;
}
