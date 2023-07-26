import { IState } from '../../../types/model';

const startState: IState = {
  currentLevel: 0,
  totalLevel: 10,
  numberOfCompleted: 0,
  stateLevels: {
    0: {
      isComplete: false,
      isHint: false,
    },
    1: {
      isComplete: false,
      isHint: false,
    },
    2: {
      isComplete: false,
      isHint: false,
    },
    3: {
      isComplete: false,
      isHint: false,
    },
    4: {
      isComplete: false,
      isHint: false,
    },
    5: {
      isComplete: false,
      isHint: false,
    },
    6: {
      isComplete: false,
      isHint: false,
    },
    7: {
      isComplete: false,
      isHint: false,
    },
    8: {
      isComplete: false,
      isHint: false,
    },
    9: {
      isComplete: false,
      isHint: false,
    },
  },
};

export default startState;
