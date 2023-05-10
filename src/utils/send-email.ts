import emailjs from '@emailjs/nodejs'
import {
  EMAILJS_FORGOT_PASSWORD_TEMPLATE_ID,
  EMAILJS_PRIVATE_KEY,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../config/credentials'

// set Public Key as global settings
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
  privateKey: EMAILJS_PRIVATE_KEY, // optional, highly recommended for security reasons
})

type SendEmailOTP = {
  to_email: string
  otp: string
}
type SendForgotEmail = {
  to_email: string
  token: string
}

export const sendEmail = async ({ to_email, otp }: SendEmailOTP) => {
  try {
    const params = {
      to_email: to_email,
      otp: otp,
    }
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
      },
      (err) => {
        console.log('FAILED...', err)
      }
    )
  } catch (err) {
    console.log({ err })
  }
}
export const sendForgotPasswordEmail = async ({
  to_email,
  token,
}: SendForgotEmail) => {
  try {
    const params = {
      to_email: to_email,
      token: token,
    }
    await emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_FORGOT_PASSWORD_TEMPLATE_ID, params)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text)
        },
        (err) => {
          console.log('FAILED...', err)
        }
      )
  } catch (err) {
    console.log({ err })
  }
}
