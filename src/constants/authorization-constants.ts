import { NavigationRoutes } from './routes';

export enum AuthTextMessages {
  enter = 'Вход в личный кабинет',
  wrong = 'Неверный логин или пароль!',
  repair = 'Восстановить?',
  forgot = 'Забыли логин или пароль?',
}
export const requiredField = 'Поле не может быть пустым';
export const onlyLatinLetters = 'латинский алфавит';
export const nameNumber = 'цифры';
export const minLength = 'не менее 8 символов';
export const uppercaseLetter = 'с заглавной буквой';
export const passwordNumber = ' и цифрой';
export const emailError = 'Введите корректный e-mail';
export const phoneError = 'В формате +375 (xx) xxx-xx-xx';
export const secondPasswordError = 'Пароли не совпадают';

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

export const stepTwoFields: InputFieldsText = {
  first: {
    placeHolder: 'Имя',
    fieldMessage: '',
  },
  second: {
    placeHolder: 'Фамилия',
    fieldMessage: '',
  },
};

export const stepThreeFields: InputFieldsText = {
  first: {
    placeHolder: 'Номер телефона',
    fieldMessage: 'В формате +375 (xx) xxx-xx-xx',
  },
  second: {
    placeHolder: 'E-mail',
    fieldMessage: 'Введите корректный e-mail',
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

export interface SubmitButtonForm {
  button: string;
  question: string;
  link: NavigationRoutes;
  linkName: string;
  isValid: boolean;
}

export const LoginButtonValues = {
  button: 'Вход',
  question: 'Нет учетной записи?',
  link: NavigationRoutes.registration,
  linkName: 'Регистрация',
};

export const SendEmailButtonValues = {
  button: 'восстановить',
  question: 'Нет учетной записи?',
  link: NavigationRoutes.registration,
  linkName: 'Регистрация',
};

export const ResetPasswordButtonValues = {
  button: 'сохранить изменения',
  question: 'После сохранения войдите в библиотеку, используя новый пароль',
  link: NavigationRoutes.empty,
  linkName: '',
};
