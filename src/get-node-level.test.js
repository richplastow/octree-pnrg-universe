// @ts-nocheck
import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getNodeLevel } from './get-node-level.js';

const xpx = 'getNodeLevel()';

// getNodeLevel() invalid.

// @ts-expect-error
throws(() => getNodeLevel(),
    { message: /^getNodeLevel\(\): nodeId_u126 type is 'undefined' not 'bigint'$/});
throws(() => getNodeLevel(2n ** 126n),
    { message: /^getNodeLevel\(\): nodeId_u126 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getNodeLevel() valid.

// Can get level 1.
eq(getNodeLevel(0n), 1); // note special case zero
eq(getNodeLevel(1n), 1);
eq(getNodeLevel(5n), 1);
eq(getNodeLevel(7n), 1);

// Can get level 2.
eq(getNodeLevel(8n), 2);
eq(getNodeLevel(12n), 2);
eq(getNodeLevel(15n), 2);
eq(getNodeLevel(16n), 2);
eq(getNodeLevel(59n), 2);
eq(getNodeLevel(63n), 2);

// Can get levels 3, 4, 5 and beyond.
eq(getNodeLevel(64n), 3);
eq(getNodeLevel(256n), 3);
eq(getNodeLevel(1023n), 4);
eq(getNodeLevel(16383n), 5);
eq(getNodeLevel(65535n), 6);
eq(getNodeLevel(4194303n), 8);
eq(getNodeLevel(16777215n), 8);
eq(getNodeLevel(268435455n), 10);
eq(getNodeLevel(1099511627775n), 14);
eq(getNodeLevel(17592186044415n), 15);
eq(getNodeLevel(12345678901234567890n), 22);
eq(getNodeLevel(10633823966279326983230456482242756606n), 41);
eq(getNodeLevel(2n ** 123n - 1n), 41);

console.log(`All ${xpx} tests passed!`);
