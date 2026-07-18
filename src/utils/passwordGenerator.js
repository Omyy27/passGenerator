import { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS, AMBIGUOUS } from './charsets';

export function generatePassword({
  length = 14,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
  excludeAmbiguous = false,
}) {
  let availableChars = '';
  const charSets = [];

  if (uppercase) {
    availableChars += UPPERCASE;
    charSets.push(UPPERCASE);
  }
  if (lowercase) {
    availableChars += LOWERCASE;
    charSets.push(LOWERCASE);
  }
  if (numbers) {
    availableChars += NUMBERS;
    charSets.push(NUMBERS);
  }
  if (symbols) {
    availableChars += SYMBOLS;
    charSets.push(SYMBOLS);
  }

  if (excludeAmbiguous) {
    for (const char of AMBIGUOUS) {
      availableChars = availableChars.replace(char, '');
    }
  }

  if (availableChars.length === 0) {
    console.warn('Debe seleccionar al menos un tipo de carácter');
    return '';
  }

  let password = '';

  for (const charSet of charSets) {
    let filteredSet = charSet;
    if (excludeAmbiguous) {
      for (const char of AMBIGUOUS) {
        filteredSet = filteredSet.replace(char, '');
      }
    }
    if (filteredSet.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSet.length);
      password += filteredSet[randomIndex];
    }
  }

  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  password = shufflePassword(password);

  return password;
}

function shufflePassword(password) {
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[randomIndex]] = [
      passwordArray[randomIndex],
      passwordArray[i],
    ];
  }
  return passwordArray.join('');
}
