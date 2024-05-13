import * as Yup from 'yup';

const RegistrationValidation = Yup.object({
    email: Yup.string()
          .email('*Invalid email address')
          // .matches(emailRegex, '*Email format thik nai')
          .required('*Email must be given'),
    fullname: Yup.string()
              .required('*fullname must be required'),
    password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('*password required')
              .min(5, '*must be 5 characters or more')
  })

export default RegistrationValidation