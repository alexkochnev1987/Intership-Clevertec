export const requiredField = 'Поле не может быть пустым';
export const onlyLatinLetters = 'латинский алфавит';
export const nameNumber = 'цифры';
export const minLength = 'не менее 8 символов';
export const uppercaseLetter = 'с заглавной буквой';
export const passwordNumber = ' и цифрой';

export interface FormFieldsSchema {
  first: string;
  second: string;
}

export const stepOneFields: InputFieldsText = {
  first: {
    placeHolder: 'Придумайте логин для входа',
    fieldMessage: 'Используйте для логина латинский алфавит и цифры',
  },
  second: {
    placeHolder: 'Пароль',
    fieldMessage: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
  },
};

export interface InputFieldsText {
  first: {
    placeHolder: string;
    fieldMessage: string;
  };
  second: {
    placeHolder: string;
    fieldMessage: string;
  };
}

export enum ButtonText {
  'Следующий шаг' = 1,
  'Последний шаг',
  'зарегистрироваться',
}
