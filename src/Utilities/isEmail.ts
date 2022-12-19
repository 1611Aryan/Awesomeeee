const isEmail = (input: string): boolean => {
  const pattern =
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  return pattern.test(input)
}

export default isEmail
