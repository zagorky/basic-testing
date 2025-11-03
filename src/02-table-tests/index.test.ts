import { Action, simpleCalculator } from './index';

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    const validTestCases = [
      {
        a: 5,
        b: 3,
        action: Action.Add,
        expected: 8,
        description: 'add two positive numbers',
      },
      {
        a: -5,
        b: -3,
        action: Action.Add,
        expected: -8,
        description: 'add negative numbers',
      },
      {
        a: 5,
        b: 0,
        action: Action.Add,
        expected: 5,
        description: 'add zero to a number',
      },
      {
        a: 10,
        b: 4,
        action: Action.Subtract,
        expected: 6,
        description: 'subtract two numbers',
      },
      {
        a: 3,
        b: 5,
        action: Action.Subtract,
        expected: -2,
        description: 'handle negative results in subtraction',
      },
      {
        a: 3,
        b: 4,
        action: Action.Multiply,
        expected: 12,
        description: 'multiply two numbers',
      },
      {
        a: 5,
        b: 0,
        action: Action.Multiply,
        expected: 0,
        description: 'multiply by zero',
      },
      {
        a: -3,
        b: -4,
        action: Action.Multiply,
        expected: 12,
        description: 'multiply negative numbers',
      },
      {
        a: 15,
        b: 3,
        action: Action.Divide,
        expected: 5,
        description: 'divide two numbers',
      },
      {
        a: 10,
        b: 4,
        action: Action.Divide,
        expected: 2.5,
        description: 'handle decimal results in division',
      },
      {
        action: Action.Divide,
        description: 'handle division by zero',
        a: 5,
        b: 0,
        expected: Infinity,
      },
      {
        a: 2,
        b: 3,
        action: Action.Exponentiate,
        expected: 8,
        description: 'exponentiate two numbers',
      },
      {
        a: 5,
        b: 0,
        action: Action.Exponentiate,
        expected: 1,
        description: 'handle zero exponent',
      },
      {
        a: 0,
        b: 0,
        action: Action.Exponentiate,
        expected: 1,
        description: 'handle zero to the power of zero',
      },
    ];

    test.each(validTestCases)(
      'should $description: $a $action $b = $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid inputs', () => {
    const invalidActionTestCases = [
      { a: 2, b: 3, action: 'invalid', description: 'invalid action string' },
      { a: 2, b: 3, action: 123, description: 'number action' },
      { a: 2, b: 3, action: null, description: 'null action' },
      { a: 2, b: 3, action: undefined, description: 'undefined action' },
    ];

    const invalidFirstArgTestCases = [
      {
        a: '2',
        b: 3,
        action: Action.Add,
        description: 'string first argument',
      },
      { a: null, b: 3, action: Action.Add, description: 'null first argument' },
      {
        a: undefined,
        b: 3,
        action: Action.Add,
        description: 'undefined first argument',
      },
    ];

    const invalidSecondArgTestCases = [
      {
        a: 2,
        b: '3',
        action: Action.Add,
        description: 'string second argument',
      },
      {
        a: 2,
        b: null,
        action: Action.Add,
        description: 'null second argument',
      },
      {
        a: 2,
        b: undefined,
        action: Action.Add,
        description: 'undefined second argument',
      },
    ];

    const invalidBothArgsTestCases = [
      {
        a: '2',
        b: '3',
        action: Action.Add,
        description: 'both string arguments',
      },
      {
        a: null,
        b: undefined,
        action: Action.Add,
        description: 'null and undefined arguments',
      },
    ];

    test.each([
      ...invalidActionTestCases,
      ...invalidFirstArgTestCases,
      ...invalidSecondArgTestCases,
      ...invalidBothArgsTestCases,
    ])('should return null for $description', ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    });
  });
});
