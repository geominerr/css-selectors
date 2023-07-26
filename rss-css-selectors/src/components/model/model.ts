import Levels from './levels/levels';
import startState from './startState/startState';
import { ILevel, IState, IStateLevels } from '../../types/model';

class Model {
  private levels: ILevel[];

  private state: IState;

  private key: string = 'RX@T10677gT';

  constructor() {
    this.levels = Levels;
    this.state = this.setState();
  }

  public getData(levelIndex?: number): ILevel | undefined {
    const index: number = levelIndex ? levelIndex : 0;

    if (this.state.currentLevel !== index) {
      this.state.currentLevel = index;
    }

    this.saveStateToLocalStorage();

    if (this.levels) {
      return this.levels[index];
    }
  }

  public getLevelNames(): string[] {
    const levelNames: string[] = [];

    this.levels?.forEach((el: ILevel): void => {
      levelNames.push(el.levelName);
    });

    return levelNames;
  }

  public resetState(): void {
    this.state = JSON.parse(JSON.stringify(startState));

    this.saveStateToLocalStorage();
  }

  public updateState(index: number, isHint?: boolean): boolean {
    if (this.state.stateLevels[index as keyof IStateLevels].isComplete !== true) {
      this.state.numberOfCompleted += 1;
    }

    this.state.stateLevels[index as keyof IStateLevels].isComplete = true;

    if (isHint) {
      this.state.stateLevels[index as keyof IStateLevels].isHint = isHint;
    }

    if (this.state.numberOfCompleted >= this.state.totalLevel) {
      return true;
    }

    return false;
  }

  public getCurrentLevel(): number {
    return this.state.currentLevel;
  }

  public getStateLevels(): IStateLevels {
    return this.state.stateLevels;
  }

  private setState(): IState {
    const savedState: IState | null = this.getStateFromLocalStorage();
    const state: IState = savedState ? savedState : JSON.parse(JSON.stringify(startState));

    return state;
  }

  private saveStateToLocalStorage(): void {
    localStorage.setItem(this.key, JSON.stringify(this.state));
  }

  private getStateFromLocalStorage(): IState | null {
    const savedState: string | null = localStorage.getItem(this.key);
    if (savedState) {
      return JSON.parse(savedState);
    }

    return null;
  }
}

export default Model;
