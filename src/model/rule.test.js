import { throws, deepEqual as eq } from 'node:assert';
import { Rule } from './rule.js';


// Rule() invalid.

const mode = 'direct-from-id';

// @ts-expect-error
throws(() => new Rule(), {
    message: /^validateRuleArguments\(\): depthMax type is 'undefined' not 'number'$/ });
throws(() => new Rule(-1, 0, mode, 'ok', [true]), {
    message: /^validateRuleArguments\(\): depthMax -1 is less than 0$/ });
throws(() => new Rule(0, -1, mode, 'ok', [true]), {
    message: /^validateRuleArguments\(\): depthMin -1 is less than 0$/ });
throws(() => new Rule(2, 3, mode, 'ok', [true]), {
    message: /^validateRuleArguments\(\): depthMax 2 is less than depthMin 3$/ });
// @ts-expect-error
throws(() => new Rule(0, 0, mode, 123, [true]), {
    message: /^validateRuleArguments\(\): key type is 'number' not 'string'$/ });
// @ts-expect-error
throws(() => new Rule(0, 0, mode, 'ok', 'not-an-array'), {
    message: /^validateRuleArguments\(\): values type is 'string' not 'array'$/ });
throws(() => new Rule(0, 0, mode, 'ok', []), {
    message: /^validateRuleArguments\(\): values is an empty array$/ });


// Rule() valid.

eq(new Rule(5, 3, mode, 'material', ['grass', 'water', 'stone']), {
    depthMax: 5,
    depthMin: 3,
    generatorMode: 'direct-from-id',
    key: 'material',
    values: ['grass', 'water', 'stone'],
});

console.log(`All Rule tests passed.`);
