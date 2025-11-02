import { getAttributes } from '../rule/get-attributes.js';
import { getOctantChildIds } from '../octree/get-octant-child-ids.js';
import { getOctantDepth } from '../octree/get-octant-depth.js';
import { getOctantParentId } from '../octree/get-octant-parent-id.js';

/**
 * @typedef {import('../type/attributes.js').Attributes} Attributes
 * @typedef {import('./rule.js').Rule} Rule
 */

/** #### An octant in an octree */
export class Octant {
    /** #### The octant's attributes, based on its ID and an array of rules
     * @type {Attributes} */
    attributes = {};

    /** #### The octant's eight children
     * - All zeroes for a leaf node octant, which has no children
     * @type {[BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt,BigInt]} */
    children = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];

    /** #### The octant's depth in its octree
     * - The special case of octant zero returns 1, though it has two depths - 0 and 1
     * @type {number} */
    depth = 0;

    /** @type {BigInt} */
    octantId = 0n;

    /** @type {BigInt} */
    parentId = 0n;

    // /** #### Calculates the octant's center in 3D space, relative to a given camera
    //  * TODO - implement properly
    //  * @param {number} cameraDepth
    //  * @param {Point} cameraPosition Relative to the center of the octree at depth `cameraDepth`
    //  * @returns {Point} Units match those of the camera position
    //  */
    // getPosition(cameraDepth, cameraPosition) {
    //     const { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition;
    //     /** @type {Point} */
    //     const position = {
    //         x: 1 + cameraX,
    //         y: 2 + cameraY,
    //         z: 3 + cameraZ,
    //     };
    //     return position;
    // };

    /**
     * @param {BigInt} octantId The octant's unique identifier within its octree
     * @param {Rule[]} [rules=[]] Optional array of rules to assign to this octant
     */
    constructor(octantId, rules = []) {
        this.children = getOctantChildIds(octantId);
        this.depth = getOctantDepth(octantId);
        this.octantId = octantId;
        this.parentId = getOctantParentId(octantId);
        this.attributes = getAttributes(octantId, rules);
    }
}
