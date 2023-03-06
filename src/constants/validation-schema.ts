import * as yup from 'yup';

import {
  emailError,
  minLength,
  nameNumber,
  onlyLatinLetters,
  passwordNumber,
  requiredField,
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

export const schemaStepThree = yup.object().shape({
  first: yup.string().required(requiredField),
  second: yup.string().email(emailError).required(requiredField),
});
