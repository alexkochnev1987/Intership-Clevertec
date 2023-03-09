const deleteCode = (string: string) => string.replace('+375', '');
const getInputNumbers = (string: string) => string.replace(/\D/g, '');
const addLeftBracket = (string: string) =>
  string
    .split('')
    .map((value, index) => (index === 0 ? ` (${value}` : value))
    .join('');
const addRightBracket = (string: string) =>
  string.length > 4
    ? string
        .split('')
        .map((value, index) => (index === 3 ? `${value}) ` : value))
        .join('')
    : string;
const addFirstDivider = (string: string) =>
  string.length > 8
    ? string
        .split('')
        .map((value, index) => (index === 9 ? `-${value}` : value))
        .join('')
    : string;
const addSecondDivider = (string: string) =>
  string.length > 11
    ? string
        .split('')
        .map((value, index) => (index === 11 ? `-${value}` : value))
        .join('')
    : string;
const addPlusSign = (string: string) => (string ? `+375${string}` : '+375 (');

export const addMaskForEmptyNumber = (string: string) => {
  const mask = '+375 (xx) xxx-xx-xx';

  return string + mask.slice(string.length);
};

export const maskInput = (string: string) =>
  addPlusSign(addFirstDivider(addSecondDivider(addRightBracket(addLeftBracket(getInputNumbers(deleteCode(string)))))));
