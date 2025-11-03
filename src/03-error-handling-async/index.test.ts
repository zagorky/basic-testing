import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test value';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });

  test('should resolve with different types', async () => {
    const values = [123, null, undefined, { key: 'value' }, [1, 2, 3]];

    for (const value of values) {
      await expect(resolveValue(value)).resolves.toBe(value);
    }
  });
});

describe('throwError', () => {
  test('should throw error when called', () => {
    expect(() => throwError()).toThrow();
  });

  test('should throw error with message', () => {
    const customMessage = 'Custom error message';
    expect(() => throwError(customMessage)).toThrow(customMessage);
  });

  test('should throw error with default message', () => {
    expect(() => throwError()).toThrow('Oops!');
  });

  test('should throw an instance of Error', () => {
    expect(() => throwError()).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error when called', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });

  test('should throw custom error with message', () => {
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject with custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });

  test('should reject with specific error message', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
