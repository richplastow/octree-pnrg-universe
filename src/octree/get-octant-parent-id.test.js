import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getOctantParentId } from './get-octant-parent-id.js';

const xpx = 'getOctantParentId()';

// getOctantParentId() invalid.

// @ts-expect-error
throws(() => getOctantParentId(),
    { message: /^getOctantParentId\(\): octantId type is 'undefined' not 'bigint'$/});
throws(() => getOctantParentId(2n ** 126n),
    { message: /^getOctantParentId\(\): octantId 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getOctantParentId() valid.

// Special case: can get the parent of zero, which is itself.
eq(getOctantParentId(0n), 0n);

// Can get child octants on levels 1 and 2.
eq(getOctantParentId(1n), 0n);
eq(getOctantParentId(8n - 1n), 0n);
eq(getOctantParentId(8n), 1n);
eq(getOctantParentId(8n + 7n), 1n);
eq(getOctantParentId(8n + 8n), 2n);
eq(getOctantParentId(40n), 5n);
eq(getOctantParentId(56n), 7n);
eq(getOctantParentId(63n), 7n);

// Can get child octants on level 3.
eq(getOctantParentId(64n), 8n);
eq(getOctantParentId(96n), 12n);
eq(getOctantParentId(120n), 15n);
eq(getOctantParentId(128n), 16n);
eq(getOctantParentId(472n), 59n);
eq(getOctantParentId(504n), 63n);

// Can get child octants on levels 4, 5, 6 and beyond.
eq(getOctantParentId(512n), 64n);
eq(getOctantParentId(2048n), 256n);
eq(getOctantParentId(8184n), 1023n);
eq(getOctantParentId(131064n), 16383n);
eq(getOctantParentId(524280n), 65535n);
eq(getOctantParentId(33554424n), 4194303n);
eq(getOctantParentId(134217720n), 16777215n);
eq(getOctantParentId(2147483640n), 268435455n);
eq(getOctantParentId(8796093022200n), 1099511627775n);
eq(getOctantParentId(140737488355320n), 17592186044415n);
eq(getOctantParentId(98765431209876543120n), 12345678901234567890n);
eq(getOctantParentId(85070591730234615865843651857942052848n), 10633823966279326983230456482242756606n);
eq(getOctantParentId(85070591730234615865843651857942052856n), 2n ** 123n - 1n);
eq(getOctantParentId(85070591730234615865843651857942052856n + 7n), 2n ** 123n - 1n);

console.log(`All ${xpx} tests passed.`);
