import Model from '../../components/model/model';
import startState from '../../components/model/startState/startState';
import { IState } from '../../types/model';

describe('setState method of Model class', (): void => {
  const model: Model = new Model();

  it('should return an object of a specific type', (): void => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const state: object = model['setState']();
    const keys: string[] = ['currentLevel', 'totalLevel', 'numberOfCompleted', 'stateLevels'];

    keys.forEach((key: string): void => {
      expect(state.hasOwnProperty(key as keyof object)).toBe(true);
    });
  });
});

describe('saveStateToLocalStorage method of Model class', (): void => {
  const model: Model = new Model();
  const controlKey: string = 'RX@T10677gT';
  const controlState: IState = startState;

  it('should write state by key to local storage', (): void => {
    localStorage.clear();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    model['saveStateToLocalStorage']();

    expect(localStorage.getItem(controlKey)).toEqual(JSON.stringify(controlState));
  });
});

describe('getStateFromLocalStorage method of Model class', (): void => {
  const model: Model = new Model();
  const controlKey: string = 'RX@T10677gT';
  const controlState: IState = startState;

  it('should get state by key from local storage', (): void => {
    localStorage.clear();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    model['saveStateToLocalStorage']();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    model['getStateFromLocalStorage']();

    expect(localStorage.getItem(controlKey)).toEqual(JSON.stringify(controlState));
  });

  it('should get null if local storage is empty', (): void => {
    localStorage.clear();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    model['getStateFromLocalStorage']();

    expect(localStorage.getItem(controlKey)).toBe(null);
  });
});
