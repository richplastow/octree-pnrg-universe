import { validateRuleArguments } from "../rule/rule-validators.js";

/**
 * @typedef {import('../type/generator-mode.js').GeneratorMode} GeneratorMode
 */

/** #### Defines a single rule for procedural content generation */
export class Rule {
    /** #### Maximum octant depth (inclusive) to apply this rule
     * @type {number} */
    depthMax = 0;

    /** #### Minimum octant depth (inclusive) to apply this rule
     * @type {number} */
    depthMin = 0;

    /** #### The technique to use when generating attributes
     * @type {GeneratorMode} */
    generatorMode = 'direct-from-id';

    /** #### The property name to set on the octant's `attributes` object
     * @type {string} */
    key = '';

    /** #### The possible values to assign when the rule applies
     * @type {boolean[] | number[] | string[]} */
    values = [];

    /**
     * @param {number} depthMax Maximum octant depth (inclusive) to apply this rule
     * @param {number} depthMin Minimum octant depth (inclusive) to apply this rule
     * @param {GeneratorMode} generatorMode The technique to use when generating attributes
     * @param {string} key The property name to set on the octant's `attributes` object
     * @param {boolean[] | number[] | string[]} values The possible values to assign when the rule applies
     */
    constructor(depthMax, depthMin, generatorMode, key, values) {

        validateRuleArguments(depthMax, depthMin, generatorMode, key, values);

        this.depthMax = depthMax;
        this.depthMin = depthMin;
        this.generatorMode = generatorMode;
        this.key = key;
        this.values = values;
    }
}
