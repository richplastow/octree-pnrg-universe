import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { Rule } from '../model/rule.js';
import {
    KEY_MAX_LENGTH,
    validateDepth,
    validateGeneratorMode,
    validateKey,
    validateRuleArguments,
    validateRulesArray,
    validateValuesArray,
} from './rule-validators.js';


// validateDepth() invalid.

// @ts-expect-error
throws(() => validateDepth(),
    { message: /^num type is 'undefined' not 'number'$/});
// @ts-expect-error
throws(() => validateDepth('123', 'fn(): maxDepth'),
    { message: /^fn\(\): maxDepth type is 'string' not 'number'$/});
throws(() => validateDepth(NaN, 'input'),
    { message: /^input NaN is not an integer$/});
throws(() => validateDepth(123.456, 'value'),
    { message: /^value 123\.456 is not an integer$/});
throws(() => validateDepth(-1, 'negative():'),
    { message: /^negative\(\): -1 is less than 0$/});
throws(() => validateDepth(42),
    { message: /^num 42 is greater than 41$/});


// validateDepth() valid.

eq(validateDepth(0, 'min():'), void 0);
eq(validateDepth(33), void 0);
eq(validateDepth(41, 'max'), void 0);


// validateGeneratorMode() invalid.

// @ts-expect-error
throws(() => validateGeneratorMode(),
    { message: /^mode type is 'undefined' not 'string'$/});
// @ts-expect-error
throws(() => validateGeneratorMode('invalid-mode', 'fn(): mode'),
    { message: /^fn\(\): mode is not a valid generator mode, e\.g\. 'direct-from-id'$/});


// validateKey() invalid.

// @ts-expect-error
throws(() => validateKey(),
    { message: /^str type is 'undefined' not 'string'$/});
// @ts-expect-error
throws(() => validateKey(123, 'fn(): key'),
    { message: /^fn\(\): key type is 'number' not 'string'$/});
throws(() => validateKey('',
    'emptyKey'), { message: /^emptyKey is an empty string$/});
throws(() => validateKey('a',
    'shortKey'), { message: /^shortKey is shorter than 2 characters$/});
throws(() => validateKey('a'.repeat(KEY_MAX_LENGTH + 1),
    'longKey'), { message: /^longKey is longer than 32 characters$/});
throws(() => validateKey('1invalidStart',
    'startsDigitKey'), { message: /^startsDigitKey fails \//});
throws(() => validateKey('_invalidStart',
    'startsUnderscoreKey'), { message: /^startsUnderscoreKey fails \//});
throws(() => validateKey('invalidEnd_',
    'endsUnderscoreKey'), { message: /^endsUnderscoreKey fails \//});
throws(() => validateKey('invalid-char',
    'hyphenKey'), { message: /^hyphenKey fails \//});
throws(() => validateKey('double__underscore',
    '__Key'), { message: /^__Key contains consecutive underscores$/});


// validateKey() valid.

eq(validateKey('aB_cD1', 'validKey'), void 0);
eq(validateKey('property_name', 'anotherValidKey'), void 0);
eq(validateKey('a'.repeat(KEY_MAX_LENGTH ), 'keyTest'), void 0);


// validateValuesArray() invalid.

// @ts-expect-error
throws(() => validateValuesArray(),
    { message: /^arr type is 'undefined' not 'array'$/});
// @ts-expect-error
throws(() => validateValuesArray('notAnArray', 'fn(): values'),
    { message: /^fn\(\): values type is 'string' not 'array'$/});
throws(() => validateValuesArray([], 'emptyArray'),
    { message: /^emptyArray is an empty array$/});
throws(() => validateValuesArray([true, false, null], 'invalidTypeArray'),
    { message: /^invalidTypeArray\[2\] is type 'object' not 'boolean'\|'number'\|'string'\|'undefined'$/});
// @ts-expect-error
throws(() => validateValuesArray([1, 'two', 3], 'mixedArray'),
    { message: /^mixedArray\[1\] is type 'string' not 'number'$/});


// validateValuesArray() valid.

/** @type {undefined} */
const u = void 0; // undefined

eq(validateValuesArray([true, false, u, true], 'boolArray'), void 0);
eq(validateValuesArray([-1, Infinity, 3, 4, 5.678], 'numArray'), void 0); // TODO maybe U128 instead of number?
eq(validateValuesArray([u, 'café', '', 'emoji 😊', u], 'strArray'), void 0); // TODO maybe some ASCII subset?
eq(validateValuesArray([42], 'singleNumArray'), void 0);
eq(validateValuesArray([u, u], 'justTwoUndefined'), void 0); // TODO maybe disallow this?


// validateRuleArguments() invalid.

const mode = 'direct-from-id';

// @ts-expect-error
throws(() => validateRuleArguments(),
    { message: /^validateRuleArguments\(\): depthMax type is 'undefined' not 'number'$/});
// @ts-expect-error
throws(() => validateRuleArguments('3', 7, mode, 'ok', ['zero', 'one']),
    { message: /depthMax type is 'string' not 'number'$/});
// @ts-expect-error
throws(() => validateRuleArguments(3, [7], mode, 'ok', ['zero', 'one']),
    { message: /depthMin type is 'object' not 'number'$/});
throws(() => validateRuleArguments(3, 7, mode, 'ok', ['zero', 'one']),
    { message: /depthMax 3 is less than depthMin 7$/});
// @ts-expect-error
throws(() => validateRuleArguments(7, 3, 'nope', 'ok', ['zero', 'one']),
    { message: /generatorMode is not a valid generator mode, e\.g\. 'direct-from-id'$/});
// @ts-expect-error
throws(() => validateRuleArguments(7, 3, mode, 123, ['zero', 'one']),
    { message: /key type is 'number' not 'string'$/});
throws(() => validateRuleArguments(7, 3, mode, 'nope_', ['zero', 'one']),
    { message: /key fails \//});
// @ts-expect-error
throws(() => validateRuleArguments(7, 3, mode, 'ok', 'notAnArray'),
    { message: /values type is 'string' not 'array'$/});
throws(() => validateRuleArguments(7, 3, mode, 'ok', []),
    { message: /values is an empty array$/});
// @ts-expect-error
throws(() => validateRuleArguments(7, 3, mode, 'ok', [true, 2, 'three']),
    { message: /values\[1\] is type 'number' not 'boolean'$/});

// validateRuleArguments() valid.

eq(validateRuleArguments(7, 3, mode, 'ok', ['zero', 'one']), void 0);


// validateRulesArray() invalid.

// @ts-expect-error
throws(() => validateRulesArray(),
    { message: /^rules is type 'undefined', not an array$/});
// @ts-expect-error
throws(() => validateRulesArray('notAnArray', 'fn(): rules'),
    { message: /^fn\(\): rules is type 'string', not an array$/});
// @ts-expect-error
throws(() => validateRulesArray([null, {}], 'invalidRules'),
    { message: /^invalidRules\[0\] is null, not an object$/});
// @ts-expect-error
throws(() => validateRulesArray([[], {}], 'invalidRules'),
    { message: /^invalidRules\[0\] is an array, not an object$/});
// @ts-expect-error
throws(() => validateRulesArray([new Rule(5, 1, mode, 'ok', [1]), 42], 'invalidRules'),
    { message: /^invalidRules\[1\] is type 'number' not 'object'$/});
// @ts-expect-error
throws(() => validateRulesArray([new Date()], 'invalidRules'),
    { message: /^invalidRules\[0\] is an instance of 'Date' not 'Rule'$/});

// validateRulesArray() valid.

eq(validateRulesArray([
    new Rule(7, 1, mode, 'galaxy', [u, u, 'spiral', 'elliptical']),
    new Rule(10, 4, mode, 'star', [u, u, 'red dwarf', 'yellow', 'blue giant']),
], 'validRules'), void 0);

console.log(`All rule-validators.js tests passed.`);
