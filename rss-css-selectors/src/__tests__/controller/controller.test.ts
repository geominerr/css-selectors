import Controller from '../../components/controller/controller';
import { STYLES } from '../../components/controller/enum';
import IViewElements from '../../types/controller';

const checkTableFieldStyles = (index: number): void => {
  it(`should add and remove element styles with a delay  test# ${index + 1}`, (): void => {
    const controller: Controller = new Controller();
    const setTimeoutSpy: jest.SpyInstance = jest.spyOn(window, 'setTimeout');

    controller.start();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const { tableField } = controller['elements'] as IViewElements;
    const timer: number = Math.round(Math.random() * 1000);
    const methodInternalDelay: number = 995;

    // eslint-disable-next-line @typescript-eslint/dot-notation
    controller['delayProcess'](timer);

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(tableField.classList.contains(STYLES.TableItemOut)).toBe(false);

    jest.advanceTimersByTime(timer);
    expect(tableField.classList.contains(STYLES.TableItemOut)).toBe(true);

    jest.advanceTimersByTime(timer + methodInternalDelay);
    expect(tableField.classList.contains(STYLES.TableItemOut)).toBe(false);
  });
};

describe('delayProcess method of Controller class', (): void => {
  jest.useFakeTimers();

  for (let i: number = 0; i < 10; i += 1) {
    checkTableFieldStyles(i);
  }
});

const checkPopupStyles = (index: number): void => {
  it(`should add element styles with a delay  test# ${index + 1}`, (): void => {
    const controller: Controller = new Controller();
    const setTimeoutSpy: jest.SpyInstance = jest.spyOn(window, 'setTimeout');

    controller.start();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const { popup } = controller['elements'] as IViewElements;
    const timer: number = Math.round(Math.random() * 10 * 500);
    const methodInternalDelay: number = 999;

    // eslint-disable-next-line @typescript-eslint/dot-notation
    controller['showWinnerPopup'](timer);

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(popup.classList.contains(STYLES.PopupOpen)).toBe(false);

    jest.advanceTimersByTime(timer + methodInternalDelay);
    expect(popup.classList.contains(STYLES.PopupOpen)).toBe(true);
  });
};

describe('showWinnerPopup method of Controller class', (): void => {
  jest.useFakeTimers();

  for (let i: number = 0; i < 10; i += 1) {
    checkPopupStyles(i);
  }
});

describe('getLevelDescription method of Controller class', (): void => {
  const controller: Controller = new Controller();
  controller.start();

  it('should return an array of strings', (): void => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const data: string[] = controller['getLevelDescription']();
    const res: boolean = data.every((el: unknown): boolean => typeof el === 'string');

    expect(res).toBe(true);
  });

  it('should return an array of four elements', (): void => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const data: string[] = controller['getLevelDescription']();
    const res: number = data.length;
    const validRes: number = 4;

    expect(res).toBe(validRes);
  });
});
