// @ts-nocheck
import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getOctantLevel } from './get-octant-level.js';

const xpx = 'getOctantLevel()';

// getOctantLevel() invalid.

// @ts-expect-error
throws(() => getOctantLevel(),
    { message: /^getOctantLevel\(\): octantId_u126 type is 'undefined' not 'bigint'$/});
throws(() => getOctantLevel(2n ** 126n),
    { message: /^getOctantLevel\(\): octantId_u126 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getOctantLevel() valid.

// Can get level 1.
eq(getOctantLevel(0n), 1); // note special case zero
eq(getOctantLevel(1n), 1);
eq(getOctantLevel(5n), 1);
eq(getOctantLevel(7n), 1);

// Can get level 2.
eq(getOctantLevel(8n), 2);
eq(getOctantLevel(12n), 2);
eq(getOctantLevel(15n), 2);
eq(getOctantLevel(16n), 2);
eq(getOctantLevel(59n), 2);
eq(getOctantLevel(63n), 2);

// Can get levels 3, 4, 5 and beyond.
eq(getOctantLevel(64n), 3);
eq(getOctantLevel(256n), 3);
eq(getOctantLevel(1023n), 4);
eq(getOctantLevel(16383n), 5);
eq(getOctantLevel(65535n), 6);
eq(getOctantLevel(4194303n), 8);
eq(getOctantLevel(16777215n), 8);
eq(getOctantLevel(268435455n), 10);
eq(getOctantLevel(1099511627775n), 14);
eq(getOctantLevel(17592186044415n), 15);
eq(getOctantLevel(12345678901234567890n), 22);
eq(getOctantLevel(10633823966279326983230456482242756606n), 41);
eq(getOctantLevel(2n ** 123n - 1n), 41);

console.log(`All ${xpx} tests passed!`);
