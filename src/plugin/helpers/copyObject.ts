function copyObject(obj: any): any {
  let clObj: any = {};
  if(Array.isArray(obj)) {
    clObj = []
  }
  for(const i in obj) {
    if (obj[i] instanceof Object) {
      clObj[i] = copyObject(obj[i]);
      continue;
    }
    clObj[i] = obj[i];
  }
  return clObj;
}

export default copyObject