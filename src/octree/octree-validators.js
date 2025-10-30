/** #### Checks that a number is an integer between 0 and 536870911 inclusive
 * - This is the range of a 29-bit unsigned integer
 * @param {number} num The number to check
 * @param {string} [xpx='num'] Exception prefix, e.g. 'calc(): values[77]'
 */
export const validateU29 = (num, xpx = 'num') => {
    if (typeof num !== 'number') throw TypeError(
        `${xpx} type is '${typeof num}' not 'number'`);
    if (!Number.isInteger(num)) throw RangeError(
        `${xpx} ${num} is not an integer`);
    if (num < 0) throw RangeError(
        `${xpx} ${num} is less than 0`);
    if (num > 536870911) throw RangeError(
        `${xpx} ${num} is greater than 536870911`);
};

/** #### Checks that a number is an integer between 0 and 4294967295 inclusive
 * - This is the range of a 32-bit unsigned integer
 * @param {number} num The number to check
 * @param {string} [xpx='num'] Exception prefix, e.g. 'calc(): values[77]'
 */
export const validateU32 = (num, xpx = 'num') => {
    if (typeof num !== 'number') throw TypeError(
        `${xpx} type is '${typeof num}' not 'number'`);
    if (!Number.isInteger(num)) throw RangeError(
        `${xpx} ${num} is not an integer`);
    if (num < 0) throw RangeError(
        `${xpx} ${num} is less than 0`);
    if (num > 4294967295) throw RangeError(
        `${xpx} ${num} is greater than 4294967295`);
};

/** #### Checks that a number is an integer between 0 and 2^123-1 inclusive
 * - This is the range of a 123-bit (not 128-bit!) unsigned integer
 * @param {BigInt} num The number to check
 * @param {string} [xpx='num'] Exception prefix, e.g. 'calc(): values[77]'
 */
export const validateU123 = (num, xpx = 'num') => {
    if (typeof num !== 'bigint') throw TypeError(
        `${xpx} type is '${typeof num}' not 'bigint'`);
    if (num < 0) throw RangeError(
        `${xpx} ${num} is less than 0`);
    if (num > 2n ** 123n - 1n) throw RangeError(
        `${xpx} ${num} is greater than 2^123-1`);
};

/** #### Checks that a number is an integer between 0 and 2^126-1 inclusive
 * - This is the range of a 126-bit (not 128-bit!) unsigned integer
 * @param {BigInt} num The number to check
 * @param {string} [xpx='num'] Exception prefix, e.g. 'calc(): values[77]'
 */
export const validateU126 = (num, xpx = 'num') => {
    if (typeof num !== 'bigint') throw TypeError(
        `${xpx} type is '${typeof num}' not 'bigint'`);
    if (num < 0) throw RangeError(
        `${xpx} ${num} is less than 0`);
    if (num > 2n ** 126n - 1n) throw RangeError(
        `${xpx} ${num} is greater than 2^126-1`);
};
