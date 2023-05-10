export const generateOTP = () => {
  const number = Math.floor(Math.random() * 100000).toString()
  return number.substring(0, 4)
}
