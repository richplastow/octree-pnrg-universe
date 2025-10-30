// @ts-nocheck
import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getOctantDepth } from './get-octant-depth.js';

const xpx = 'getOctantDepth()';

// getOctantDepth() invalid.

// @ts-expect-error
throws(() => getOctantDepth(),
    { message: /^getOctantDepth\(\): octantId_u126 type is 'undefined' not 'bigint'$/});
throws(() => getOctantDepth(2n ** 126n),
    { message: /^getOctantDepth\(\): octantId_u126 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getOctantDepth() valid.

// Can get level 1.
eq(getOctantDepth(0n), 1); // note special case zero
eq(getOctantDepth(1n), 1);
eq(getOctantDepth(5n), 1);
eq(getOctantDepth(7n), 1);

// Can get level 2.
eq(getOctantDepth(8n), 2);
eq(getOctantDepth(12n), 2);
eq(getOctantDepth(15n), 2);
eq(getOctantDepth(16n), 2);
eq(getOctantDepth(59n), 2);
eq(getOctantDepth(63n), 2);

// Can get levels 3, 4, 5 and beyond.
eq(getOctantDepth(64n), 3);
eq(getOctantDepth(256n), 3);
eq(getOctantDepth(1023n), 4);
eq(getOctantDepth(16383n), 5);
eq(getOctantDepth(65535n), 6);
eq(getOctantDepth(4194303n), 8);
eq(getOctantDepth(16777215n), 8);
eq(getOctantDepth(268435455n), 10);
eq(getOctantDepth(1099511627775n), 14);
eq(getOctantDepth(17592186044415n), 15);
eq(getOctantDepth(12345678901234567890n), 22);
eq(getOctantDepth(10633823966279326983230456482242756606n), 41);
eq(getOctantDepth(2n ** 123n - 1n), 41);

console.log(`All ${xpx} tests passed!`);
