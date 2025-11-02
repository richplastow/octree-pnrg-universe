import { Rule } from '../model/rule.js';

/**
 * @typedef {import('../type/generator-mode.js').GeneratorMode} GeneratorMode
 */

/** #### Checks that a number is an integer between 0 and 41 inclusive
 * - This is the range of octree depths
 * @param {number} num The number to check
 * @param {string} [xpx='num'] Exception prefix, e.g. 'fn(): maxDepth'
 */
export const validateDepth = (num, xpx = 'num') => {
    if (typeof num !== 'number') throw TypeError(
        `${xpx} type is '${typeof num}' not 'number'`);
    if (!Number.isInteger(num)) throw RangeError(
        `${xpx} ${num} is not an integer`);
    if (num < 0) throw RangeError(
        `${xpx} ${num} is less than 0`);
    if (num > 41) throw RangeError(
        `${xpx} ${num} is greater than 41`);
};

/** #### Set of valid generator modes */
export const validGeneratorModes = new Set([
    'direct-from-id',
    'pnrg-TODO',
]);

/** #### Checks that a generator mode is valid
 * @param {GeneratorMode} mode the generator mode to check
 */
export const validateGeneratorMode = (mode, xpx = 'mode') => {
    if (typeof mode !== 'string') throw TypeError(
        `${xpx} type is '${typeof mode}' not 'string'`);
    if (!validGeneratorModes.has(mode)) throw RangeError(
        `${xpx} is not a valid generator mode, e.g. 'direct-from-id'`);
}

/** #### Regular expression for validating property names */
export const keyRx = /^[a-z][a-zA-Z0-9_]*[a-zA-Z0-9]$/;

/** #### Maximum length for a property name */
export const KEY_MAX_LENGTH = 32;

/** #### Checks that a string is a valid property name
 * @param {string} str The string to check
 * @param {string} [xpx='str'] Exception prefix, e.g. 'fn(): key'
 */
export const validateKey = (str, xpx = 'str') => {
    if (typeof str !== 'string') throw TypeError(
        `${xpx} type is '${typeof str}' not 'string'`);
    if (str.length === 0) throw RangeError(
        `${xpx} is an empty string`);
    if (str.length < 2) throw RangeError( // the regex actually enforces this
        `${xpx} is shorter than 2 characters`);
    if (str.length > KEY_MAX_LENGTH) throw RangeError(
        `${xpx} is longer than ${KEY_MAX_LENGTH} characters`);
    if (!keyRx.test(str)) throw RangeError(
        `${xpx} fails ${keyRx}`);
    if (str.includes('__')) throw RangeError(
        `${xpx} contains consecutive underscores`);
};

/** #### Checks that an array of possible values is valid
 * @param {boolean[] | number[] | string[]} arr The array to check
 * @param {string} [xpx='arr'] Exception prefix, e.g. 'fn(): values'
 */
export const validateValuesArray = (arr, xpx = 'arr') => {
    if (!Array.isArray(arr)) throw TypeError(
        `${xpx} type is '${typeof arr}' not 'array'`);
    if (arr.length === 0) throw RangeError(
        `${xpx} is an empty array`);
    let firstType;
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        const t = typeof val;
        if (t !== 'boolean' && t !== 'number' && t !== 'string') {
            throw TypeError(
                `${xpx}[${i}] is type '${t}' not 'boolean'|'number'|'string'`);
        }
        if (i === 0) {
            firstType = t;
        } else if (t !== firstType) {
            throw TypeError(
                `${xpx}[${i}] is type '${t}' not '${firstType}'`);
        }
    }
}

/** #### Checks that the arguments passed to the Rule constructor are valid
 * @param {number} depthMax Maximum octant depth (inclusive) to apply this rule
 * @param {number} depthMin Minimum octant depth (inclusive) to apply this rule
 * @param {GeneratorMode} generatorMode The technique to use when generating attributes
 * @param {string} key The property name to set on the octant's `attributes` object
 * @param {boolean[] | number[] | string[]} values The possible values to assign when the rule applies
 */
export const validateRuleArguments = (depthMax, depthMin, generatorMode, key, values) => {
    const xpx = 'validateRuleArguments():';

    // Validate the depth arguments.
    validateDepth(depthMax, `${xpx} depthMax`)
    validateDepth(depthMin, `${xpx} depthMin`)
    if (depthMax < depthMin) throw RangeError(
        `${xpx} depthMax ${depthMax} is less than depthMin ${depthMin}`);

    // Validate the generator mode and key.
    validateGeneratorMode(generatorMode, `${xpx} generatorMode`);
    validateKey(key, `${xpx} key`);

    // Validate the array of possible values.
    validateValuesArray(values, `${xpx} values`);
}

/** #### Checks that an array of rules is valid
 * @param {Rule[]} arr The array to check
 * @param {string} [xpx='rules'] Exception prefix, e.g. 'fn(): rules'
 */
export const validateRulesArray = (arr, xpx = 'rules') => {
    if (!Array.isArray(arr)) throw TypeError(
        `${xpx} is type '${typeof arr}', not an array`);
    for (let i = 0; i < arr.length; i++) {
        const rule = arr[i];
        if (rule === null) throw TypeError(
            `${xpx}[${i}] is null, not an object`);
        if (Array.isArray(rule)) throw TypeError(
            `${xpx}[${i}] is an array, not an object`);
        if (typeof rule !== 'object') throw TypeError(
            `${xpx}[${i}] is type '${typeof rule}' not 'object'`);
        if (!(rule instanceof Rule)) {
            /** @type {{}} **/ const notRule = rule;
            const notRuleName = notRule.constructor.name;
            throw TypeError(
                `${xpx}[${i}] is an instance of '${notRuleName}' not 'Rule'`);
        }
    }
};
