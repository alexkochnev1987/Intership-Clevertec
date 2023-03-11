import * as yup from 'yup';

import {
  emailError,
  minLength,
  nameNumber,
  onlyLatinLetters,
  passwordNumber,
  phoneError,
  requiredField,
  secondPasswordError,
  uppercaseLetter,
} from './authorization-constants';

export const schemaStepOne = yup.object().shape({
  username: yup
    .string()
    .required(requiredField)
    .matches(/[a-zA-Z]/g, { message: onlyLatinLetters })
    .matches(/[0-9]/g, nameNumber),

  password: yup
    .string()
    .required(requiredField)
    .min(8, minLength)
    .matches(/[A-ZА-Я]/g, uppercaseLetter)
    .matches(/\d/g, passwordNumber),
});
export const schemaStepTwo = yup.object().shape({
  firstName: yup.string().required(requiredField),
  lastName: yup.string().required(requiredField),
});

const checkOperator = (value: string) => {
  const operator = value?.split('(')[1]?.split(')')[0];

  return operator ? ['29', '44', '33', '25'].includes(operator) : false;
};

const checkNumberLength = (value: string) => {
  const getInputNumbers = (string: string) => string.replace(/\D/g, '');

  return getInputNumbers(value).length === 12 ? true : false;
};

export const schemaStepThree = yup.object().shape({
  phone: yup
    .string()
    .required(requiredField)
    .test('isFullNumber', phoneError, checkNumberLength)
    .test('BelarusOperator', phoneError, checkOperator),
  email: yup.string().required(requiredField).email(emailError),
});

export const schemaSendEmail = yup.object().shape({
  email: yup.string().required(requiredField).email(emailError),
});

export const schemaResetPassword = yup.object().shape({
  password: yup
    .string()
    .required(requiredField)
    .min(8, minLength)
    .matches(/[A-ZА-Я]/g, uppercaseLetter)
    .matches(/\d/g, passwordNumber),

  passwordConfirmation: yup
    .string()
    .required(requiredField)
    .when('password', ([password], schema) => schema.matches(password, secondPasswordError)),
});
