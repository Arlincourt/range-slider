function isArraysEqual(arr1: Array<any>, arr2: Array<any>): boolean {
  if(arr1.length !== arr2.length) {
    return false
  }

  let isEqual = true
  arr1.forEach((className, idx) => {
    isEqual = className === arr2[idx] && isEqual
  })

  return isEqual
}

export default isArraysEqual