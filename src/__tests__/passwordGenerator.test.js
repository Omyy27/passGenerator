import { describe, it, expect } from 'vitest';
import { generatePassword } from '../utils/passwordGenerator';

describe('generatePassword', () => {
  it('generates a password of specified length', () => {
    const pwd = generatePassword({ length: 16, lowercase: true, uppercase: true, numbers: true, symbols: true });
    expect(pwd).toHaveLength(16);
  });

  it('returns empty string when no char types selected', () => {
    const pwd = generatePassword({ lowercase: false, uppercase: false, numbers: false, symbols: false });
    expect(pwd).toBe('');
  });

  it('contains at least one character from each selected set', () => {
    const pwd = generatePassword({ length: 8, lowercase: true, uppercase: true, numbers: true, symbols: true });
    expect(pwd).toMatch(/[a-z]/);
    expect(pwd).toMatch(/[A-Z]/);
    expect(pwd).toMatch(/[0-9]/);
    expect(pwd).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
  });

  it('generates unique passwords on successive calls', () => {
    const pwd1 = generatePassword({ length: 20 });
    const pwd2 = generatePassword({ length: 20 });
    expect(pwd1).not.toBe(pwd2);
  });

  it('defaults to length 14', () => {
    const pwd = generatePassword({ lowercase: true, uppercase: true, numbers: true, symbols: true });
    expect(pwd).toHaveLength(14);
  });

  it('excludes ambiguous characters when flag is set', () => {
    const pwd = generatePassword({ length: 50, lowercase: true, uppercase: true, numbers: true, symbols: true, excludeAmbiguous: true });
    expect(pwd).not.toMatch(/[0O1lI5S2Z]/);
  });
});
