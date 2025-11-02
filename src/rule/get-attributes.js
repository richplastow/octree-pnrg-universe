import { getOctantDepth } from '../octree/get-octant-depth.js';
import { validateU126 } from '../octree/octree-validators.js';
import { validateRulesArray } from './rule-validators.js';

/**
 * @typedef {import('../type/attributes.js').Attributes} Attributes
 * @typedef {import('../type/generator-mode.js').GeneratorMode} GeneratorMode
 * @typedef {import('../model/rule.js').Rule} Rule
 */

/** #### Calculate an octant's attributes, based on its ID and an array of rules
 * @param {BigInt} octantId The octant ID (must be an integer, 0 to 2^126-1)
 * @param {Rule[]} rules The array of rules to evaluate for this octant
 * @returns {Attributes} The octant's attributes
 */
export const getAttributes = (octantId, rules) => {
    validateU126(octantId, 'getAttributes(): octantId');
    validateRulesArray(rules, 'getAttributes(): rules');

    /** @type {Attributes} */
    const attributes = {};
    const depth = getOctantDepth(octantId);

    for (const { depthMax, depthMin, generatorMode, key, values } of rules) {
        if (depth >= depthMin && depth <= depthMax) {
            let index;
            switch (generatorMode) {
                case 'direct-from-id':
                    index = octantId % BigInt(values.length);
                    break;
                default:
            }
            const value = values[Number(index)];
            attributes[key] = value;
        }
    }
    return attributes;
}
