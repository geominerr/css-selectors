import Model from '../model/model';
import AppView from '../view/AppView';
import { STYLES, EVENTS, KEYNAME } from './enum';
import { ILevel, LevelData, IStateLevels } from '../../types/model';
import { Selector } from '../../types/general';
import IViewElements from '../../types/controller';

class Controller {
  private model: Model;

  private view: AppView;

  private level: ILevel | null;

  private elements: IViewElements | null;

  private currentLevel: number;

  private stateLevels: IStateLevels;

  constructor() {
    this.model = new Model();
    this.view = new AppView();
    this.level = null;
    this.elements = null;
    this.currentLevel = this.model.getCurrentLevel();
    this.stateLevels = this.model.getStateLevels();
  }

  public start(): void {
    const levelData: LevelData = this.getData(this.currentLevel);
    const levelDescription: string[] = this.getLevelDescription();
    const currentLevel: number = this.currentLevel;

    this.view.renderPage(levelData, levelDescription, currentLevel);
    this.setObjectElements();
    this.updateSidebarTitle();
    this.updateLevelsList();
    this.addMouseEventHandler();
    this.addClickHandler();
    this.addInputHandler();
  }

  private setObjectElements(): void {
    this.elements = this.view.getElements();
  }

  private addMouseEventHandler(): void {
    const { htmlSelectors, playElements, popupElements } = this.elements as IViewElements;

    document.addEventListener(EVENTS.Mouseover, (e: MouseEvent): void => {
      const target: HTMLElement = e.target as HTMLElement;
      let index: number = 0;

      if (htmlSelectors.includes(target)) {
        target.classList.add(STYLES.HtmlSelectorFocus);
        index = htmlSelectors.indexOf(target);
        popupElements[index].classList.add(STYLES.PopupItemActive);
        playElements[index].classList.add(STYLES.PlayItemFocus);
      }
      if (playElements.includes(target)) {
        target.classList.add(STYLES.PlayItemFocus);
        index = playElements.indexOf(target);
        popupElements[index].classList.add(STYLES.PopupItemActive);
        htmlSelectors[index].classList.add(STYLES.HtmlSelectorFocus);
      }
    });

    document.addEventListener(EVENTS.Mouseout, (e: MouseEvent): void => {
      const target: HTMLElement = e.target as HTMLElement;
      let index: number = 0;

      if (htmlSelectors.includes(target)) {
        target.classList.remove(STYLES.HtmlSelectorFocus);
        index = htmlSelectors.indexOf(target);
        popupElements[index].classList.remove(STYLES.PopupItemActive);
        playElements[index].classList.remove(STYLES.PlayItemFocus);
      }

      if (playElements.includes(target)) {
        target.classList.remove(STYLES.PlayItemFocus);
        index = playElements.indexOf(target);
        popupElements[index].classList.remove(STYLES.PopupItemActive);
        htmlSelectors[index].classList.remove(STYLES.HtmlSelectorFocus);
      }
    });
  }

  private addClickHandler(): void {
    const { buttonsControl } = this.elements as IViewElements;
    const btnPrev: HTMLElement = buttonsControl[0];
    const btnNext: HTMLElement = buttonsControl[1];
    const btnMenu: HTMLElement = buttonsControl[2];
    const btnReset: HTMLElement = buttonsControl[3];

    document.addEventListener(EVENTS.Click, (e: MouseEvent): void => {
      const target: HTMLElement = e.target as HTMLElement;
      const currentLevel: number = this.currentLevel;

      if (target === btnPrev) {
        this.currentLevel = currentLevel > 0 ? currentLevel - 1 : 0;
      }

      if (target === btnNext) {
        this.currentLevel = currentLevel < 9 ? currentLevel + 1 : 9;
      }

      if (target === btnNext || target === btnPrev) {
        this.updatePage();
      }
    });

    this.addClickHandlerButtonReset(btnReset, btnMenu);
    this.addClickHandlerLevelsList(btnMenu);
  }

  private addClickHandlerLevelsList(buttonMenu: HTMLElement): void {
    const { levelsList } = this.elements as IViewElements;
    const { levelsPanel } = this.elements as IViewElements;

    levelsList.forEach((el: HTMLElement): void => {
      el.addEventListener(EVENTS.Click, () => {
        levelsList.forEach((item: HTMLElement): void => {
          item.classList.remove(STYLES.ListItemSelected);
        });

        el.classList.add(STYLES.ListItemSelected);
        const index: number = levelsList.indexOf(el);
        this.currentLevel = index;
        this.updatePage();

        buttonMenu.classList.remove(STYLES.BurgerActive);
        levelsPanel.classList.remove(STYLES.LevelsOpen);
      });
    });
  }

  private addInputHandler(): void {
    const { inputButtons } = this.elements as IViewElements;
    const inputField: HTMLInputElement = this.elements?.inputField as HTMLInputElement;
    const btnEnter: HTMLElement = inputButtons[0];
    const btnHelp: HTMLElement = inputButtons[1];

    this.addClickHandlerButtonEnter(btnEnter, inputField);
    this.addClickHandlerButtonHelp(btnHelp, inputField);
    this.addKeyDownHandler(btnEnter, inputField);
  }

  private addClickHandlerButtonEnter(btn: HTMLElement, input: HTMLInputElement): void {
    btn.addEventListener(EVENTS.Click, (): void => {
      const answer: string | undefined = this.level?.correctSelector;

      if (input.value.trim() === answer) {
        const isWin: boolean = this.model.updateState(this.currentLevel);
        this.currentLevel += this.currentLevel < 9 ? 1 : 0;

        if (!isWin) {
          this.delayProcess(0);
        } else {
          this.delayProcess(0);
          this.showWinnerPopup(0);
        }
      } else {
        this.view.addGameResultAnimation();
      }
    });
  }

  private addClickHandlerButtonHelp(btn: HTMLElement, input: HTMLInputElement): void {
    btn.addEventListener(EVENTS.Click, (): void => {
      if (this.level) {
        const answer: string = this.level.correctSelector;
        input.classList.add(STYLES.InputFilled);
        input.value = '';

        for (let i: number = 0; i < answer.length; i += 1) {
          setTimeout(() => {
            input.value += answer[i];
          }, i * 400);
        }

        const isWin: boolean = this.model.updateState(this.currentLevel, true);
        this.currentLevel += this.currentLevel < 9 ? 1 : 0;
        const timer: number = answer.length * 400 + 100;

        if (!isWin) {
          this.delayProcess(timer);
        } else {
          this.delayProcess(timer);
          this.showWinnerPopup(timer);
        }
      }
    });
  }

  private addClickHandlerButtonReset<T extends HTMLElement>(btn: T, btnMenu: T): void {
    const { levelsPanel } = this.elements as IViewElements;

    btn.addEventListener(EVENTS.Click, () => {
      levelsPanel.classList.remove(STYLES.LevelsOpen);
      btnMenu.classList.remove(STYLES.BurgerActive);

      this.resetStateApp();
    });
  }

  private addKeyDownHandler(buttonEnter: HTMLElement, input: HTMLInputElement): void {
    document.addEventListener(EVENTS.Keydown, (e: KeyboardEvent): void => {
      const answer: string | undefined = this.level?.correctSelector;

      if (e.key === KEYNAME.Enter) {
        e.preventDefault();

        buttonEnter.classList.add(STYLES.ButtonEnterActive);
        if (input.value.trim() === answer) {
          const isWin: boolean = this.model.updateState(this.currentLevel);
          this.currentLevel += this.currentLevel < 9 ? 1 : 0;

          if (!isWin) {
            this.delayProcess(0);
          } else {
            this.delayProcess(0);
            this.showWinnerPopup(0);
          }
        } else {
          this.view.addGameResultAnimation();
        }

        setTimeout(() => {
          buttonEnter.classList.remove(STYLES.ButtonEnterActive);
        }, 200);
      }
    });
  }

  private updatePage(): void {
    this.view.updatePage(
      this.getData(this.currentLevel),
      this.getLevelDescription(),
      this.currentLevel
    );
    this.setObjectElements();
    this.updateSidebarTitle();
    this.updateLevelsList();

    this.addMouseEventHandler();
  }

  private resetStateApp(): void {
    this.model.resetState();
    this.stateLevels = this.model.getStateLevels();
    this.currentLevel = 0;
    this.updatePage();
  }

  private updateSidebarTitle(): void {
    if (this.elements) {
      const sidebarTitle: HTMLElement = this.elements.sidebarTitle;
      const stateLevels: IStateLevels = this.stateLevels;
      const currentLevel: number = this.currentLevel;

      const levelStatus: Element | null = sidebarTitle.nextElementSibling;
      const hintStatus: Element | null = levelStatus ? levelStatus.nextElementSibling : null;

      if (levelStatus && hintStatus) {
        if (stateLevels[currentLevel as keyof IStateLevels].isComplete) {
          levelStatus.classList.add(STYLES.LevelStatusActive);
          if (stateLevels[currentLevel as keyof IStateLevels].isHint) {
            hintStatus.classList.add(STYLES.HintStatusActive);
          }
        } else {
          levelStatus.classList.remove(STYLES.LevelStatusActive);
          hintStatus.classList.remove(STYLES.HintStatusActive);
        }
      }
    }
  }

  private updateLevelsList(): void {
    const stateLevels: IStateLevels = this.stateLevels;
    const levelsList: HTMLElement[] = this.elements?.levelsList as HTMLElement[];
    const currentLevel: number = this.currentLevel;

    levelsList.forEach((el: HTMLElement, index: number): void => {
      const levelStatusItem: Element = el.children[0];
      const hintStatusItem: Element = el.children[1];

      if (index === currentLevel) {
        el.classList.add(STYLES.ListItemSelected);
      } else {
        el.classList.remove(STYLES.ListItemSelected);
      }

      if (stateLevels[index as keyof IStateLevels].isComplete) {
        levelStatusItem.classList.add(STYLES.LevelStatusActive);
      } else {
        levelStatusItem.classList.remove(STYLES.LevelStatusActive);
        hintStatusItem.classList.remove(STYLES.HintStatusActive);
      }

      if (stateLevels[index as keyof IStateLevels].isHint) {
        hintStatusItem.classList.add(STYLES.HintStatusActive);
      }
    });
  }

  private getData(index?: number): LevelData {
    const data: ILevel = this.model.getData(index) as ILevel;
    this.level = data;

    const title: string = data.mainTitle;
    const selectors: Selector[] = data.selectors;
    const levelNames: string[] = this.model.getLevelNames();

    return [title, selectors, levelNames];
  }

  private getLevelDescription(): string[] {
    const props: string[] = ['taskTitle', 'description', 'exampleTitle', 'example'];
    const levelDesc: string[] = [];

    props.forEach((prop: string): void => {
      if (this.level) {
        const value: string = this.level[prop as keyof ILevel] as string;

        levelDesc.push(value);
      }
    });

    return levelDesc;
  }

  private delayProcess(timer: number): void {
    const { tableField } = this.elements as IViewElements;

    setTimeout(() => {
      tableField.classList.add(STYLES.TableItemOut);
    }, timer);
    setTimeout(() => {
      this.updatePage();
    }, timer + 1000);
    setTimeout(() => {
      tableField.classList.remove(STYLES.TableItemOut);
    }, timer + 995);
  }

  private showWinnerPopup(timer: number): void {
    const { popup } = this.elements as IViewElements;

    setTimeout(() => {
      popup.classList.add(STYLES.PopupOpen);
    }, timer + 999);
  }
}

export default Controller;
