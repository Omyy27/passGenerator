const LOG2 = Math.log(2);

function charsetSize(options) {
  let size = 0;
  if (options.uppercase) size += 26;
  if (options.lowercase) size += 26;
  if (options.numbers) size += 10;
  if (options.symbols) size += 32;
  return size;
}

export function calculateEntropy(options) {
  const pool = charsetSize(options);
  if (pool === 0 || options.length === 0) return 0;
  return Math.round(options.length * (Math.log(pool) / LOG2) * 10) / 10;
}

export function getStrengthLevel(entropy) {
  if (entropy <= 0) return { label: 'None', level: 0 };
  if (entropy < 30) return { label: 'Weak', level: 1 };
  if (entropy < 50) return { label: 'Fair', level: 2 };
  if (entropy < 70) return { label: 'Strong', level: 3 };
  return { label: 'Very Strong', level: 4 };
}

export function getStrengthColor(level) {
  switch (level) {
    case 1: return 'var(--color-strength-weak)';
    case 2: return 'var(--color-strength-fair)';
    case 3: return 'var(--color-strength-strong)';
    case 4: return 'var(--color-strength-very-strong)';
    default: return 'var(--color-bg-strength)';
  }
}
