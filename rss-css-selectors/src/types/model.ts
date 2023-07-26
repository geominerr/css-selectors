import { Selector } from './general';

interface ILevel {
  mainTitle: string;
  taskTitle: string;
  description: string;
  exampleTitle: string;
  levelName: string;
  example: string;
  selectors: Selector[];
  correctSelector: string;
}

interface IState {
  currentLevel: number;
  totalLevel: number;
  numberOfCompleted: number;
  stateLevels: IStateLevels;
}

interface IStateLevels {
  0: IStatusLevel;
  1: IStatusLevel;
  2: IStatusLevel;
  3: IStatusLevel;
  4: IStatusLevel;
  5: IStatusLevel;
  6: IStatusLevel;
  7: IStatusLevel;
  8: IStatusLevel;
  9: IStatusLevel;
}

interface IStatusLevel {
  isComplete: boolean;
  isHint: boolean;
}

type LevelData = [string, Selector[], string[]];

export { ILevel, LevelData, IState, IStateLevels };
