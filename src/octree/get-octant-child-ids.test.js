import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { getOctantChildIds } from './get-octant-child-ids.js';

const xpx = 'getOctantChildIds()';

// getOctantChildIds() invalid.

// @ts-expect-error
throws(() => getOctantChildIds(),
    { message: /^getOctantChildIds\(\): octantId type is 'undefined' not 'bigint'$/});
throws(() => getOctantChildIds(2n ** 126n), // the next number after the last leaf node
    { message: /^getOctantChildIds\(\): octantId 85070591730234615865843651857942052864 is greater than 2\^126-1$/});
throws(() => getOctantChildIds(2n ** 128n - 2n), // the second-highest uint that 128 bits can represent
    { message: /^getOctantChildIds\(\): octantId 340282366920938463463374607431768211454 is greater than 2\^126-1$/});
throws(() => getOctantChildIds(2n ** 128n - 1n), // the highest uint that 128 bits can represent
    { message: /^getOctantChildIds\(\): octantId 340282366920938463463374607431768211455 is greater than 2\^126-1$/});


// getOctantChildIds() valid.

// Can get child octants on levels 1 and 2.
eq(getOctantChildIds(0n), [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n]); // note special case zero
eq(getOctantChildIds(1n), [8n, 9n, 10n, 11n, 12n, 13n, 14n, 15n]);
eq(getOctantChildIds(5n), [40n, 41n, 42n, 43n, 44n, 45n, 46n, 47n]);
eq(getOctantChildIds(7n), [56n, 57n, 58n, 59n, 60n, 61n, 62n, 63n]);

// Can get child octants on level 3.
eq(getOctantChildIds(8n), [64n, 65n, 66n, 67n, 68n, 69n, 70n, 71n]);
eq(getOctantChildIds(12n), [96n, 97n, 98n, 99n, 100n, 101n, 102n, 103n]);
eq(getOctantChildIds(15n), [120n, 121n, 122n, 123n, 124n, 125n, 126n, 127n]);
eq(getOctantChildIds(16n), [128n, 129n, 130n, 131n, 132n, 133n, 134n, 135n]);
eq(getOctantChildIds(59n), [472n, 473n, 474n, 475n, 476n, 477n, 478n, 479n]);
eq(getOctantChildIds(63n), [504n, 505n, 506n, 507n, 508n, 509n, 510n, 511n]);

// Can get child octants on levels 4, 5, 6 and beyond.
eq(getOctantChildIds(64n), [512n, 513n, 514n, 515n, 516n, 517n, 518n, 519n]);
eq(getOctantChildIds(256n), [2048n, 2049n, 2050n, 2051n, 2052n, 2053n, 2054n, 2055n]);
eq(getOctantChildIds(1023n), [8184n, 8185n, 8186n, 8187n, 8188n, 8189n, 8190n, 8191n]);
eq(getOctantChildIds(16383n), [131064n, 131065n, 131066n, 131067n, 131068n, 131069n, 131070n, 131071n]);
eq(getOctantChildIds(65535n), [524280n, 524281n, 524282n, 524283n, 524284n, 524285n, 524286n, 524287n]);
eq(getOctantChildIds(4194303n), [33554424n, 33554425n, 33554426n, 33554427n, 33554428n, 33554429n, 33554430n, 33554431n]);
eq(getOctantChildIds(16777215n), [134217720n, 134217721n, 134217722n, 134217723n,
    134217724n, 134217725n, 134217726n, 134217727n]);
eq(getOctantChildIds(268435455n), [2147483640n, 2147483641n, 2147483642n, 2147483643n,
    2147483644n, 2147483645n, 2147483646n, 2147483647n]);
eq(getOctantChildIds(1099511627775n), [8796093022200n, 8796093022201n, 8796093022202n,
    8796093022203n, 8796093022204n, 8796093022205n, 8796093022206n, 8796093022207n]);
eq(getOctantChildIds(17592186044415n), [140737488355320n, 140737488355321n, 140737488355322n,
    140737488355323n, 140737488355324n, 140737488355325n, 140737488355326n, 140737488355327n]);
eq(getOctantChildIds(12345678901234567890n), [
    98765431209876543120n, 98765431209876543121n,
    98765431209876543122n, 98765431209876543123n,
    98765431209876543124n, 98765431209876543125n,
    98765431209876543126n, 98765431209876543127n,
]);
eq(getOctantChildIds(10633823966279326983230456482242756606n), [
    85070591730234615865843651857942052848n,
    85070591730234615865843651857942052849n,
    85070591730234615865843651857942052850n,
    85070591730234615865843651857942052851n,
    85070591730234615865843651857942052852n,
    85070591730234615865843651857942052853n,
    85070591730234615865843651857942052854n,
    85070591730234615865843651857942052855n,
]);
eq(getOctantChildIds(2n ** 123n - 1n), [
    85070591730234615865843651857942052856n,
    85070591730234615865843651857942052857n,
    85070591730234615865843651857942052858n,
    85070591730234615865843651857942052859n,
    85070591730234615865843651857942052860n,
    85070591730234615865843651857942052861n,
    85070591730234615865843651857942052862n,
    85070591730234615865843651857942052863n,
]);
eq(getOctantChildIds(2n ** 123n), [ // the first leaf node
    0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n,
]);
eq(getOctantChildIds(2n ** 126n - 1n), [ // the last leaf node
    0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n,
]);

console.log(`All ${xpx} tests passed.`);
