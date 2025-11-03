import { Action, simpleCalculator } from './index';

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    test('should add two positive numbers', () => {
      const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
      expect(result).toBe(8);
    });

    test('should add negative numbers', () => {
      const result = simpleCalculator({ a: -5, b: -3, action: Action.Add });
      expect(result).toBe(-8);
    });

    test('should add zero to a number', () => {
      const result = simpleCalculator({ a: 5, b: 0, action: Action.Add });
      expect(result).toBe(5);
    });

    test('should subtract two numbers', () => {
      const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
      expect(result).toBe(6);
    });

    test('should handle negative results in subtraction', () => {
      const result = simpleCalculator({ a: 3, b: 5, action: Action.Subtract });
      expect(result).toBe(-2);
    });

    test('should multiply two numbers', () => {
      const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
      expect(result).toBe(12);
    });

    test('should multiply by zero', () => {
      const result = simpleCalculator({ a: 5, b: 0, action: Action.Multiply });
      expect(result).toBe(0);
    });

    test('should multiply negative numbers', () => {
      const result = simpleCalculator({
        a: -3,
        b: -4,
        action: Action.Multiply,
      });
      expect(result).toBe(12);
    });

    test('should divide two numbers', () => {
      const result = simpleCalculator({ a: 15, b: 3, action: Action.Divide });
      expect(result).toBe(5);
    });

    test('should handle decimal results in division', () => {
      const result = simpleCalculator({ a: 10, b: 4, action: Action.Divide });
      expect(result).toBe(2.5);
    });

    test('should handle division by zero', () => {
      const result = simpleCalculator({ a: 5, b: 0, action: Action.Divide });
      expect(result).toBe(Infinity);
    });

    test('should exponentiate two numbers', () => {
      const result = simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      });
      expect(result).toBe(8);
    });

    test('should handle zero exponent', () => {
      const result = simpleCalculator({
        a: 5,
        b: 0,
        action: Action.Exponentiate,
      });
      expect(result).toBe(1);
    });

    test('should handle zero to the power of zero', () => {
      const result = simpleCalculator({
        a: 0,
        b: 0,
        action: Action.Exponentiate,
      });
      expect(result).toBe(1);
    });
  });

  describe('invalid inputs', () => {
    test('should return null for invalid action', () => {
      expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' })).toBeNull();
    });

    test('should return null for non-string action', () => {
      expect(simpleCalculator({ a: 2, b: 3, action: 123 })).toBeNull();
      expect(simpleCalculator({ a: 2, b: 3, action: null })).toBeNull();
      expect(simpleCalculator({ a: 2, b: 3, action: undefined })).toBeNull();
    });

    test('should return null for non-number first argument', () => {
      expect(simpleCalculator({ a: '2', b: 3, action: Action.Add })).toBeNull();
      expect(
        simpleCalculator({ a: null, b: 3, action: Action.Add }),
      ).toBeNull();
      expect(
        simpleCalculator({ a: undefined, b: 3, action: Action.Add }),
      ).toBeNull();
    });

    test('should return null for non-number second argument', () => {
      expect(simpleCalculator({ a: 2, b: '3', action: Action.Add })).toBeNull();
      expect(
        simpleCalculator({ a: 2, b: null, action: Action.Add }),
      ).toBeNull();
      expect(
        simpleCalculator({ a: 2, b: undefined, action: Action.Add }),
      ).toBeNull();
    });

    test('should return null for both invalid arguments', () => {
      expect(
        simpleCalculator({ a: '2', b: '3', action: Action.Add }),
      ).toBeNull();
      expect(
        simpleCalculator({ a: null, b: undefined, action: Action.Add }),
      ).toBeNull();
    });
  });
});
