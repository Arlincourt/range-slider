function isArraysEqual<T>(arr1: Array<T>, arr2: Array<T>): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let isEqual = true;
  arr1.forEach((className, idx) => {
    isEqual = className === arr2[idx] && isEqual;
  });

  return isEqual;
}

export default isArraysEqual;
