import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  let account: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amount = initialBalance + 1;
    expect(() => account.withdraw(amount)).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    const targetAccount = getBankAccount(0);
    const amount = initialBalance + 1;

    expect(() => account.transfer(amount, targetAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(account.getBalance()).toBe(initialBalance);
    expect(targetAccount.getBalance()).toBe(0);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const targetAccount = getBankAccount(0);
    const amount = 30;

    account.transfer(amount, targetAccount);

    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(targetAccount.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    expect(balance === null || typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 75;
    const originalFetchBalance = account.fetchBalance;
    account.fetchBalance = jest.fn().mockResolvedValue(mockBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockBalance);
    account.fetchBalance = originalFetchBalance;
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const originalFetchBalance = account.fetchBalance;
    account.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    account.fetchBalance = originalFetchBalance;
  });
});
