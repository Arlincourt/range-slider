import { IState, IEmit } from '../../types/interfaces';
import Model from './Model';
import Orientation from '../../types/orientation';


describe('Model module', () => {
  let model: Model;
  const modelData1: IState = {
    tips: true,
    orientation: Orientation.VERTICAL,
    value: [3, 12],
    min: 0,
    max: 100,
    step: 1,
    range: true,
    progressBar: true,
    scale: true,
    possibleValues: {0: 0, 16: 16, 32: 32, 48: 48, 64: 64, 80: 80, 100: 100}
  }

  const options1: IEmit = {
    value: 3,
    mouseDown: true
  }

  beforeEach(() => { 
    model = new Model(modelData1); 
  });

  test('init model: getState should not to be modelData1 but should to be equal', () => {
    expect(model.getState()).not.toBe(modelData1);
    expect(model.getState()).toEqual(modelData1);
  })

  test('init model: getState should not to be modelData1 but should to be equal', () => {
    const callback = jest.fn();
    model.setOnChangeMethod(callback);
    model.update(options1);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalledTimes(2);
  });

  test('orientation should be horizontal', () => {
    model.setOrientation('HORIZONTAL');
    expect(model.getState().orientation).toBe(Orientation.HORIZONTAL);
  });

  test('min and firstValue should be 9.2', () => {
    model.setMin(9.2);
    expect(model.getState().min).toBe(9.2);
    expect(model.getState().value[0]).toBe(9.2);
  });
  
  test('max and second value should be 11.3', () => {
    model.setMax(11.3);
    expect(model.getState().max).toBe(11.3);
    expect(model.getState().value[1]).toBe(11.3);
  });

  test('tips should be false', () => {
    model.setTips(false);
    expect(model.getState().tips).toBe(false);
  });

  test('range should be false and first value should be 3', () => {
    model.setRange(false);
    model.setFirstValue(3);
    model.setMin(9.2);
    expect(model.getState().range).toBe(false);
    expect(model.getState().value[0]).toBe(9.2);
  });

  test('first value should be 11', () => {
    model.setFirstValue(11);
    expect(model.getState().value[0]).toBe(11);
  });

  test('second value should be 14', () => {
    model.setSecondValue(14);
    expect(model.getState().value[1]).toBe(14);
  });
  
  test('step should be 0.2 and second value should be 12 and first value 3', () => {
    model.setStep(0.2);
    model.setSecondValue(14);
    expect(model.getState().step).toBe(0.2);
    expect(model.getState().value[1]).toBe(14);
    expect(model.getState().value[0]).toBe(11);
  });

  test('should correct calculate prossible values', () => {
    const possibleValues = {
      0: 0, 
      16: 16, 
      32: 32, 
      48: 48, 
      64: 64, 
      80: 80, 
      100: 100
    }
    expect(model.getPossibleValues).toEqual(possibleValues);
  });
});