import { IUniversalObjectType } from '../types/interfaces';

function copyObject(obj: IUniversalObjectType): IUniversalObjectType {
  const clObj: IUniversalObjectType = {};
  Object.keys(obj).forEach((key) => {
    const field = obj[key];
    if (Array.isArray(field)) {
      clObj[key] = [...field];
    } else if (typeof field === 'object' && field !== null) {
      clObj[key] = { ...field };
    } else {
      clObj[key] = obj[key];
    }
  });
  return clObj;
}

export default copyObject;
