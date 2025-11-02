import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { Rule } from '../model/rule.js';
import { getAttributes } from './get-attributes.js';

const xpx = 'getAttributes()';

// getAttributes() invalid.

// @ts-expect-error
throws(() => getAttributes(),
    { message: /^getAttributes\(\): octantId type is 'undefined' not 'bigint'$/});
// @ts-expect-error
throws(() => getAttributes(2n ** 126n),
    { message: /octantId 85070591730234615865843651857942052864 is greater than 2\^126-1$/});
// @ts-expect-error
throws(() => getAttributes(-5n),
    { message: /octantId -5 is less than 0$/});
// @ts-expect-error
throws(() => getAttributes(123n),
    { message: /^getAttributes\(\): rules is type 'undefined', not an array$/});
// @ts-expect-error
throws(() => getAttributes(123n, {}),
    { message: /rules is type 'object', not an array$/});
// @ts-expect-error
throws(() => getAttributes(123n, [1, 2, 3]),
    { message: /rules\[0\] is type 'number' not 'object'$/});

// getAttributes() valid.

const mode = 'direct-from-id';
/** @type {undefined} */
const u = void 0; // undefined
const spaceRules = [
    new Rule(7, 1, mode, 'galaxy', [u, u, 'spiral', 'elliptical']),
    new Rule(10, 4, mode, 'star', [u, u, 'red dwarf', 'yellow', 'blue giant']),
]

eq(getAttributes(0n, spaceRules), {});
eq(getAttributes(1n, spaceRules), {}); // not `{ galaxy: undefined }`
eq(
    getAttributes(2n, spaceRules),
    { galaxy: 'spiral' }
);
eq(
    getAttributes(16383n, spaceRules),
    { galaxy: 'elliptical', star: 'yellow' }
);
eq(getAttributes(1099511627775n, spaceRules), {});

console.log(`All ${xpx} tests passed.`);
