// Я смог типизировать без any, но тогда не получается с СабВидами, которые используют
// эту функцию, так как возвращаемый тип не соответствует нужному интерфейсу (в зависимости
// от СабВида). С обобщенным типом(T) не получается типизировать аргумент функции

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
