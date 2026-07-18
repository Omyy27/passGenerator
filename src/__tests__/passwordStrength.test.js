import { describe, it, expect } from 'vitest';
import { calculateEntropy, getStrengthLevel } from '../utils/passwordStrength';

describe('calculateEntropy', () => {
  it('returns 0 for empty options', () => {
    expect(calculateEntropy({ length: 0, uppercase: false, lowercase: false, numbers: false, symbols: false })).toBe(0);
  });

  it('returns positive entropy for valid options', () => {
    const entropy = calculateEntropy({ length: 14, uppercase: true, lowercase: true, numbers: true, symbols: true });
    expect(entropy).toBeGreaterThan(0);
  });

  it('returns higher entropy for longer passwords', () => {
    const short = calculateEntropy({ length: 8, uppercase: true, lowercase: true, numbers: true, symbols: true });
    const long = calculateEntropy({ length: 24, uppercase: true, lowercase: true, numbers: true, symbols: true });
    expect(long).toBeGreaterThan(short);
  });
});

describe('getStrengthLevel', () => {
  it('returns Weak for entropy < 30', () => {
    expect(getStrengthLevel(20).label).toBe('Weak');
  });

  it('returns Fair for entropy between 30 and 50', () => {
    expect(getStrengthLevel(40).label).toBe('Fair');
  });

  it('returns Strong for entropy between 50 and 70', () => {
    expect(getStrengthLevel(60).label).toBe('Strong');
  });

  it('returns Very Strong for entropy >= 70', () => {
    expect(getStrengthLevel(80).label).toBe('Very Strong');
  });

  it('returns level 0 for entropy <= 0', () => {
    expect(getStrengthLevel(0).level).toBe(0);
  });
});
