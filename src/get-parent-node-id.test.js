// @ts-nocheck
import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getParentNodeId } from './get-parent-node-id.js';

const xpx = 'getParentNodeId()';

// getParentNodeId() invalid.

// @ts-expect-error
throws(() => getParentNodeId(),
    { message: /^getParentNodeId\(\): nodeId_u126 type is 'undefined' not 'bigint'$/});
throws(() => getParentNodeId(2n ** 126n),
    { message: /^getParentNodeId\(\): nodeId_u126 85070591730234615865843651857942052864 is greater than 2\^126-1$/});


// getParentNodeId() valid.

// Can get child nodes on levels 1 and 2.
eq(getParentNodeId(0n), 0n); // note special case zero
eq(getParentNodeId(1n), 0n);
eq(getParentNodeId(8n - 1n), 0n);
eq(getParentNodeId(8n), 1n);
eq(getParentNodeId(8n + 7n), 1n);
eq(getParentNodeId(8n + 8n), 2n);
eq(getParentNodeId(40n), 5n);
eq(getParentNodeId(56n), 7n);

// Can get child nodes on level 3.
eq(getParentNodeId(64n), 8n);
eq(getParentNodeId(96n), 12n);
eq(getParentNodeId(120n), 15n);
eq(getParentNodeId(128n), 16n);
eq(getParentNodeId(472n), 59n);
eq(getParentNodeId(504n), 63n);

// Can get child nodes on levels 4, 5, 6 and beyond.
eq(getParentNodeId(512n), 64n);
eq(getParentNodeId(2048n), 256n);
eq(getParentNodeId(8184n), 1023n);
eq(getParentNodeId(131064n), 16383n);
eq(getParentNodeId(524280n), 65535n);
eq(getParentNodeId(33554424n), 4194303n);
eq(getParentNodeId(134217720n), 16777215n);
eq(getParentNodeId(2147483640n), 268435455n);
eq(getParentNodeId(8796093022200n), 1099511627775n);
eq(getParentNodeId(140737488355320n), 17592186044415n);
eq(getParentNodeId(98765431209876543120n), 12345678901234567890n);
eq(getParentNodeId(85070591730234615865843651857942052848n), 10633823966279326983230456482242756606n);
eq(getParentNodeId(85070591730234615865843651857942052856n), 2n ** 123n - 1n);
eq(getParentNodeId(85070591730234615865843651857942052856n + 7n), 2n ** 123n - 1n);

console.log(`All ${xpx} tests passed!`);
