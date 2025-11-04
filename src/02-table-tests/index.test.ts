import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  describe('valid operations', () => {
    const testCases = [
      {
        a: 5,
        b: 3,
        action: Action.Add,
        expected: 8,
        describe: 'should add two numbers',
      },
      {
        a: 10,
        b: 4,
        action: Action.Subtract,
        expected: 6,
        describe: 'should subtract two numbers',
      },
      {
        a: 3,
        b: 4,
        action: Action.Multiply,
        expected: 12,
        describe: 'should multiply two numbers',
      },
      {
        a: 15,
        b: 3,
        action: Action.Divide,
        expected: 5,
        describe: 'should divide two numbers',
      },
      {
        a: 2,
        b: 3,
        action: Action.Exponentiate,
        expected: 8,
        describe: 'should exponentiate two numbers',
      },
    ];

    test.each(testCases)('$describe', ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });

  describe('invalid inputs', () => {
    const testCases = [
      {
        a: '2',
        b: 3,
        action: Action.Add,
        describe: 'should return null for invalid arguments',
      },
      {
        a: 2,
        b: 3,
        action: 'invalid',
        describe: 'should return null for invalid action',
      },
    ];

    test.each(testCases)('$describe', ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    });
  });
});
