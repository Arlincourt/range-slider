function copyObject<T>(obj: any): T {
  let clObj: any = {};
  if (Array.isArray(obj)) {
    clObj = [];
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      clObj[key] = copyObject(obj[key]);
    } else {
      clObj[key] = obj[key];
    }
  });
  return clObj;
}

export default copyObject;
