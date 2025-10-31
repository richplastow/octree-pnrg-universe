import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { Octant } from './octant.js';


// Octant() invalid.

// @ts-expect-error
throws(() => new Octant(), {
    message: /^getOctantChildIds\(\): octantId type is 'undefined' not 'bigint'$/ });
throws(() => new Octant(-1n), {
    message: /^getOctantChildIds\(\): octantId -1 is less than 0$/ });
throws(() => new Octant(2n ** 126n), {
    message: /^getOctantChildIds\(\): octantId 85070591730234615865843651857942052864 is greater than 2\^126-1$/ });


// Octant() valid.

// Special-case octant 0.
{
    const octant = new Octant(0n);
    eq(octant.children, [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n]);
    eq(octant.depth, 0);
    eq(octant.octantId, 0n);
    eq(octant.parentId, 0n);
}

// Level 1 examples.
{
    const octant = new Octant(5n);
    eq(octant.children, [40n, 41n, 42n, 43n, 44n, 45n, 46n, 47n]);
    eq(octant.depth, 1);
    eq(octant.octantId, 5n);
    eq(octant.parentId, 0n);
}

// Level 2 examples.
{
    const octant = new Octant(12n);
    eq(octant.children, [96n, 97n, 98n, 99n, 100n, 101n, 102n, 103n]);
    eq(octant.depth, 2);
    eq(octant.octantId, 12n);
    eq(octant.parentId, 1n);
}

// Level 3 examples.
{
    const octant = new Octant(64n);
    eq(octant.children, [512n, 513n, 514n, 515n, 516n, 517n, 518n, 519n]);
    eq(octant.depth, 3);
    eq(octant.octantId, 64n);
    eq(octant.parentId, 8n);
}

// Deep examples and leaf nodes.
{
    const octant = new Octant(2n ** 123n);
    eq(octant.children, [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n]); // first leaf
    eq(octant.depth, 42);
    eq(octant.octantId, 2n ** 123n);
    // parent is octantId >> 3
    eq(octant.parentId, 1329227995784915872903807060280344576n);
}

{
    const octant = new Octant(2n ** 126n - 1n);
    eq(octant.children, [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n]); // last leaf
    eq(octant.depth, 42);
    eq(octant.octantId, 2n ** 126n - 1n);
    eq(octant.parentId, 2n ** 123n - 1n);
}

console.log(`All Octant tests passed!`);
