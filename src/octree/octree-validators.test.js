import { throws, deepStrictEqual as eq } from 'node:assert/strict';
import { validateU32, validateU29, validateU123, validateU126 } from './octree-validators.js';


// validateU32() invalid.

// @ts-expect-error
throws(() => validateU32(),
    { message: /^num type is 'undefined' not 'number'$/});
// @ts-expect-error
throws(() => validateU32('123', 'calc(): values[77]'),
    { message: /^calc\(\): values\[77\] type is 'string' not 'number'$/});
throws(() => validateU32(NaN, 'input'),
    { message: /^input NaN is not an integer$/});
throws(() => validateU32(123.456, 'value'),
    { message: /^value 123\.456 is not an integer$/});
throws(() => validateU32(-1, 'negative():'),
    { message: /^negative\(\): -1 is less than 0$/});
throws(() => validateU32(4294967296),
    { message: /^num 4294967296 is greater than 4294967295$/});


// validateU32() valid.

eq(validateU32(0, 'min():'), void 0);
eq(validateU32(1234567890), void 0);
eq(validateU32(4294967295, 'max'), void 0);


// validateU29() invalid.

// @ts-expect-error
throws(() => validateU29(),
    { message: /^num type is 'undefined' not 'number'$/});
// @ts-expect-error
throws(() => validateU29('123', 'calc(): values[77]'),
    { message: /^calc\(\): values\[77\] type is 'string' not 'number'$/});
throws(() => validateU29(NaN, 'input'),
    { message: /^input NaN is not an integer$/});
throws(() => validateU29(123.456, 'value'),
    { message: /^value 123\.456 is not an integer$/});
throws(() => validateU29(-1, 'negative():'),
    { message: /^negative\(\): -1 is less than 0$/});
throws(() => validateU29(536870912),
    { message: /^num 536870912 is greater than 536870911$/});

// validateU29() valid.

eq(validateU29(0, 'min():'), void 0);
eq(validateU29(123456789), void 0);
eq(validateU29(536870911, 'max'), void 0);


// validateU123() invalid.

// @ts-expect-error
throws(() => validateU123(),
    { message: /^num type is 'undefined' not 'bigint'$/});
// @ts-expect-error
throws(() => validateU123(123, 'calc(): values[77]'),
    { message: /^calc\(\): values\[77\] type is 'number' not 'bigint'$/});
throws(() => validateU123(-1n, 'negative():'),
    { message: /^negative\(\): -1 is less than 0$/});
throws(() => validateU123(2n ** 123n, 'too big'),
    { message: /^too big 10633823966279326983230456482242756608 is greater than 2\^123-1$/});

// validateU123() valid.

eq(validateU123(0n, 'min():'), void 0);
eq(validateU123(123456789012345678901234567890n), void 0);
eq(validateU123(2n ** 123n - 1n, 'max'), void 0);


// validateU126() invalid.

// @ts-expect-error
throws(() => validateU126(),
    { message: /^num type is 'undefined' not 'bigint'$/});
// @ts-expect-error
throws(() => validateU126(123, 'calc(): values[77]'),
    { message: /^calc\(\): values\[77\] type is 'number' not 'bigint'$/});
throws(() => validateU126(-1n, 'negative():'),
    { message: /^negative\(\): -1 is less than 0$/});
throws(() => validateU126(2n ** 126n, 'too big'),
    { message: /^too big 85070591730234615865843651857942052864 is greater than 2\^126-1$/});

// validateU126() valid.

eq(validateU126(0n, 'min():'), void 0);
eq(validateU126(123456789012345678901234567890n), void 0);
eq(validateU126(2n ** 126n - 1n, 'max'), void 0);

console.log(`All octree-validators.js tests passed.`);
