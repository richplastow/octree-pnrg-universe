import { validateU126 } from './octree-validators.js';

/** #### Returns the depth of an octant in its octree
 * - The special case of octant zero returns 0, though it has two depths - 0 and 1
 * @param {BigInt} octantId The octant ID (must be an integer, 0 to 2^126-1)
 * @returns {number} The depth of the octant (1 to 42)
 */
export const getOctantDepth = (octantId) => {
    validateU126(octantId, 'getOctantDepth(): octantId');

    // Special case for zero.
    if (octantId === 0n) return 0;

    // Efficiently find the highest set bit position, which determines the depth.
    // We step through the bits in chunks of 3 bits (since it's an octree).
    let depth = 0;
    let id = octantId;
    while (id > 0n) {
        depth++;
        id >>= 3n;
    }
    return depth;
}
