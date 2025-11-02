// Conjuntos de caracteres disponibles
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Genera una contraseña segura según los parámetros especificados
 * @param {Object} options - Opciones de configuración
 * @param {number} options.length - Longitud de la contraseña (por defecto 14)
 * @param {boolean} options.uppercase - Incluir letras mayúsculas
 * @param {boolean} options.lowercase - Incluir letras minúsculas
 * @param {boolean} options.numbers - Incluir números
 * @param {boolean} options.symbols - Incluir símbolos
 * @returns {string} - Contraseña generada
 */
export const generatePassword = ({
  length = 14,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
}) => {
  // Construir el conjunto de caracteres disponibles
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

  // Validar que haya al menos un conjunto de caracteres
  if (availableChars.length === 0) {
    console.warn('Debe seleccionar al menos un tipo de carácter');
    return '';
  }

  let password = '';

  // Garantizar que la contraseña contenga al menos un carácter de cada conjunto seleccionado
  for (const charSet of charSets) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  // Llenar el resto de la contraseña con caracteres aleatorios
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  // Mezclar los caracteres para mejor seguridad
  password = shufflePassword(password);

  return password;
};

/**
 * Mezcla aleatoriamente los caracteres de una contraseña
 * @param {string} password - Contraseña a mezclar
 * @returns {string} - Contraseña mezclada
 */
const shufflePassword = (password) => {
  const passwordArray = password.split('');

  for (let i = passwordArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[randomIndex]] = [
      passwordArray[randomIndex],
      passwordArray[i],
    ];
  }

  return passwordArray.join('');
};
