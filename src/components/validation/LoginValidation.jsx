import * as Yup from 'yup';

 // const emailRegex = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

const LoginValidation = Yup.object({
    email: Yup.string()
          .email('*Invalid email address')
          // .matches(emailRegex, '*Email format thik nai')
          .required('*Email must be given'),
    password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('*password required')
              .min(5, '*must be 5 characters or more')
  })

export default LoginValidation