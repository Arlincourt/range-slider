/**
 * @jest-environment jsdom
*/

import { IRunnerService } from "../../../types/interfaces";
import RunnerService from "./RunnerService";
import Orientation from '../../../types/orientation'
import Classes from "../../../types/classes";

describe('RunnerService module', () => {
  let runnerService: RunnerService;
  const runnerServiceData1: IRunnerService = {
    tips: true,
    range: true,
    orientation: Orientation.VERTICAL,
    value: [0, 99]
  }
  const runnerServiceData2: IRunnerService = {
    tips: false,
    range: false,
    orientation: Orientation.HORIZONTAL,
    value: [10, 16]
  }

  beforeEach(() => { 
    runnerService = new RunnerService(runnerServiceData1); 
  });

  test('should update private fields', () => {
    const firstRunner = {...runnerService.getFirstRunner}
    const secondRunner = {...runnerService.getSecondRunner}
    const secondRunnerData = {...runnerService.getSecondRunnerData}
    const firstRunnerData = {...runnerService.getFirstRunnerData}
    const runnerServiceState = {...runnerService.getRunnerServiceState}
    
    expect(runnerServiceState).toEqual(runnerServiceData1)

    runnerService.update(runnerServiceData2)

    expect(runnerService.getRunnerServiceState).not.toEqual(runnerServiceState)
    expect(runnerService.getRunnerServiceState).toEqual(runnerServiceData2)
    expect(runnerService.getFirstRunner).not.toEqual(firstRunner)
    expect(runnerService.getSecondRunner).not.toEqual(secondRunner)
    expect(runnerService.getSecondRunnerData).not.toEqual(secondRunnerData)
    expect(runnerService.getFirstRunnerData).not.toEqual(firstRunnerData)
  })

  test('should return array of html elements', () => {
    expect(runnerService.getTemplate().length).toBe(2)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItem)).toBe(true)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItemTop)).toBe(true)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItemHorizontal)).toBe(false)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItemVertical)).toBe(true)
    runnerService.update(runnerServiceData2)
    expect(runnerService.getTemplate().length).toBe(1)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItem)).toBe(true)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItemRight)).toBe(true)
    expect(runnerService.getTemplate()[0].classList.contains(Classes.sliderItemHorizontal)).toBe(true)
  })
})