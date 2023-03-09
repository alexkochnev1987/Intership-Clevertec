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
} from './authorisation-constants';

export const schemaStepOne = yup.object().shape({
  first: yup
    .string()
    .required(requiredField)
    .matches(/[a-zA-Z]/g, { message: onlyLatinLetters })
    .matches(/[0-9]/g, nameNumber),

  second: yup
    .string()
    .min(8, minLength)
    .matches(/[A-ZА-Я]/g, uppercaseLetter)
    .matches(/\d/g, passwordNumber)
    .required(requiredField),
});
export const schemaStepTwo = yup.object().shape({
  first: yup.string().required(requiredField),
  second: yup.string().required(requiredField),
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
  first: yup
    .string()
    .required(requiredField)
    .test('isFullNumber', phoneError, checkNumberLength)
    .test('BelarusOperator', phoneError, checkOperator),
  second: yup.string().email(emailError).required(requiredField),
});

export const schemaSendEmail = yup.object().shape({
  first: yup.string().email(emailError).required(requiredField),
});

export const schemaResetPassword = yup.object().shape({
  first: yup
    .string()
    .min(8, minLength)
    .matches(/[A-ZА-Я]/g, uppercaseLetter)
    .matches(/\d/g, passwordNumber)
    .required(requiredField),

  second: yup
    .string()
    .oneOf([yup.ref('first')], secondPasswordError)
    .required(requiredField),
});
