function getSymbols(number: number): number {
  const stringNumber: string = String(number)
  if(!stringNumber.includes('.')) {
    return 0
  }

  const index = stringNumber.indexOf('.')
  return stringNumber.substr(index + 1, stringNumber.length).length
}

export default getSymbols