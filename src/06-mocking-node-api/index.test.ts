import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.useFakeTimers();

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      timeout,
    );

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;
    const numberOfIntervals = 3;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * numberOfIntervals);

    expect(callback).toHaveBeenCalledTimes(numberOfIntervals);

    setIntervalSpy.mockRestore();

    expect(callback).toHaveBeenCalledTimes(numberOfIntervals);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = 'test.txt';
  const mockContent = 'test content';

  beforeEach(() => {
    jest.clearAllMocks();

    (join as jest.Mock).mockReturnValue(mockPath);
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
    expect(existsSync).toHaveBeenCalledWith(mockPath);
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe(mockContent);
    expect(existsSync).toHaveBeenCalledWith(mockPath);
    expect(readFile).toHaveBeenCalledWith(expect.stringContaining(mockPath));
  });
});
