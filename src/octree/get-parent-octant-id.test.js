// @ts-nocheck
import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getParentOctantId } from './get-parent-octant-id.js';

const xpx = 'getParentOctantId()';

// getParentOctantId() invalid.

// @ts-expect-error
throws(() => getParentOctantId(),
    { message: /^getParentOctantId\(\): octantId_u126 type is 'undefined' not 'bigint'$/});
throws(() => getParentOctantId(2n ** 126n),
    { message: /^getParentOctantId\(\): octantId_u126 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getParentOctantId() valid.

// Can get child octants on levels 1 and 2.
eq(getParentOctantId(0n), 0n); // note special case zero
eq(getParentOctantId(1n), 0n);
eq(getParentOctantId(8n - 1n), 0n);
eq(getParentOctantId(8n), 1n);
eq(getParentOctantId(8n + 7n), 1n);
eq(getParentOctantId(8n + 8n), 2n);
eq(getParentOctantId(40n), 5n);
eq(getParentOctantId(56n), 7n);

// Can get child octants on level 3.
eq(getParentOctantId(64n), 8n);
eq(getParentOctantId(96n), 12n);
eq(getParentOctantId(120n), 15n);
eq(getParentOctantId(128n), 16n);
eq(getParentOctantId(472n), 59n);
eq(getParentOctantId(504n), 63n);

// Can get child octants on levels 4, 5, 6 and beyond.
eq(getParentOctantId(512n), 64n);
eq(getParentOctantId(2048n), 256n);
eq(getParentOctantId(8184n), 1023n);
eq(getParentOctantId(131064n), 16383n);
eq(getParentOctantId(524280n), 65535n);
eq(getParentOctantId(33554424n), 4194303n);
eq(getParentOctantId(134217720n), 16777215n);
eq(getParentOctantId(2147483640n), 268435455n);
eq(getParentOctantId(8796093022200n), 1099511627775n);
eq(getParentOctantId(140737488355320n), 17592186044415n);
eq(getParentOctantId(98765431209876543120n), 12345678901234567890n);
eq(getParentOctantId(85070591730234615865843651857942052848n), 10633823966279326983230456482242756606n);
eq(getParentOctantId(85070591730234615865843651857942052856n), 2n ** 123n - 1n);
eq(getParentOctantId(85070591730234615865843651857942052856n + 7n), 2n ** 123n - 1n);

console.log(`All ${xpx} tests passed!`);
