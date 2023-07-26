import { STYLES, TAGNAMES, CONTENT, EVENTS } from '../sidebar/enum';
import './sidebar.scss';

class Sidebar {
  private taskTitle: HTMLElement | null = null;

  private taskDesc: HTMLElement | null = null;

  private exampleTitle: HTMLElement | null = null;

  private taskExample: HTMLElement | null = null;

  private panelTitle: HTMLElement | null = null;

  private progressBar: HTMLProgressElement | null = null;

  private levelsPanel: HTMLElement | null = null;

  private buttonPrev: HTMLElement | null = null;

  private buttonNext: HTMLElement | null = null;

  private buttonMenu: HTMLElement | null = null;

  private buttonReset: HTMLElement | null = null;

  private levelsList: HTMLElement[] = [];

  constructor() {
    this.taskTitle = this.createElement(TAGNAMES.H3, STYLES.TaskTitle);
    this.taskDesc = this.createElement(TAGNAMES.P, STYLES.TaskDesc);
    this.taskExample = this.createElement(TAGNAMES.P, STYLES.TaskExample);
    this.exampleTitle = this.createElement(TAGNAMES.H4, STYLES.ExampleTitle);
    this.panelTitle = this.createElement(TAGNAMES.H3, STYLES.PanelTitle);
    this.progressBar = this.createProgressBar(TAGNAMES.Progress, STYLES.ProgressBar);
  }

  public createSidebarBlock(data: string[], levelDesc: string[], indexLevel: number): HTMLElement {
    const { taskTitle, panelTitle, progressBar, taskDesc, taskExample, exampleTitle } = this;
    const sidebar: HTMLElement = this.createElement(TAGNAMES.Aside, STYLES.Sidebar);
    const panelContainer: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.PanelContainer);
    const panel: HTMLElement = this.createPanel();
    const levelsPanel: HTMLElement = this.createLevelsPanel(data);
    const control: HTMLElement = this.createControl();
    const btnMenuOpen: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.ControlBtnMain);

    this.addClickHandler(btnMenuOpen, sidebar);

    if (panelTitle) {
      panelTitle.innerText = `Level ${indexLevel + 1} of 10`;
      panel.insertBefore(panelTitle, panel.firstChild);
    }

    [panel, control].forEach((el: HTMLElement): void => panelContainer.append(el));

    if (taskTitle && taskDesc && taskExample && exampleTitle && progressBar) {
      [taskTitle, taskDesc, exampleTitle, taskExample].forEach(
        (el: HTMLElement, index: number) => (el.innerText = levelDesc[index])
      );

      progressBar.value = (indexLevel + 1) * 10;

      [
        btnMenuOpen,
        panelContainer,
        progressBar,
        taskTitle,
        taskDesc,
        exampleTitle,
        taskExample,
        levelsPanel,
      ].forEach((el: HTMLElement): void => sidebar.append(el));
    }

    return sidebar;
  }

  public updateSidebar(levelDesc: string[], indexLevel: number): void {
    const { taskTitle, panelTitle, progressBar, taskDesc, taskExample, exampleTitle } = this;

    if (taskTitle && panelTitle && progressBar && taskDesc && taskExample && exampleTitle) {
      panelTitle.innerText = `Level ${indexLevel + 1} of 10`;

      [taskTitle, taskDesc, exampleTitle, taskExample].forEach(
        (el: HTMLElement, index: number): void => {
          el.innerText = levelDesc[index];
        }
      );

      progressBar.value = (indexLevel + 1) * 10;
    }
  }

  public getControlButtons(): HTMLElement[] {
    const buttonPrev: HTMLElement = this.buttonPrev as HTMLElement;
    const buttonNext: HTMLElement = this.buttonNext as HTMLElement;
    const buttonMenu: HTMLElement = this.buttonMenu as HTMLElement;
    const buttonReset: HTMLElement = this.buttonReset as HTMLElement;

    return [buttonPrev, buttonNext, buttonMenu, buttonReset];
  }

  public getLevelsList(): HTMLElement[] {
    return this.levelsList;
  }

  public getTitle(): HTMLElement {
    return this.panelTitle as HTMLElement;
  }

  public getLevelsPanel(): HTMLElement {
    return this.levelsPanel as HTMLElement;
  }

  private createPanel(): HTMLElement {
    const panel: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.Panel);
    const levelStatus: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.LvlStatus);
    const hintStatus: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.HintStatus);

    if (this.panelTitle) {
      [this.panelTitle, levelStatus, hintStatus].forEach((el: HTMLElement): void =>
        panel.append(el)
      );
    }

    return panel;
  }

  private createControl(): HTMLElement {
    const control: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.Control);
    const btnPrev: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.ControlBtnPrev);
    const btnNext: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.ControlBtnNext);
    const btnWrapper: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.BtnWrapper);
    const btnMenu: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.ControlBtnMenu);

    this.buttonPrev = btnPrev;
    this.buttonNext = btnNext;

    btnWrapper.append(btnMenu);

    this.buttonMenu = btnWrapper;
    this.addHandler(btnWrapper);

    [btnPrev, btnNext, btnWrapper].forEach((el: HTMLElement): void => control.append(el));

    return control;
  }

  private createLevelsPanel(levels: string[]): HTMLElement {
    const levelsContainer: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.Levels);
    const title: HTMLElement = this.createElement(TAGNAMES.H3, STYLES.LevelsTitle);
    const levelsList: HTMLElement = this.createElement(TAGNAMES.Ol, STYLES.LevelsList);
    const buttonReset: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.BtnReset);

    buttonReset.innerText = CONTENT.BtnReset;
    this.buttonReset = buttonReset;

    for (let i: number = 0; i < levels.length; i += 1) {
      const item: HTMLElement = this.createElement(TAGNAMES.Li, STYLES.LevelsItem);
      const levelStatus: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.LvlStatus);
      const hintStatus: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.HintStatus);
      const itemName: HTMLElement = this.createElement(TAGNAMES.Li, STYLES.LevelsItemName);

      itemName.innerText = levels[i];
      [levelStatus, hintStatus, itemName].forEach((el: HTMLElement): void => item.append(el));

      this.levelsList.push(item);
      levelsList.append(item);
    }

    title.innerText = CONTENT.LevelsTitle;

    [title, levelsList, buttonReset].forEach((el: HTMLElement): void => levelsContainer.append(el));

    this.levelsPanel = levelsContainer;

    return levelsContainer;
  }

  private createProgressBar(tagName: string, style: string): HTMLProgressElement {
    const element: HTMLProgressElement = document.createElement(tagName) as HTMLProgressElement;
    element.classList.add(style);
    element.value = 10;
    element.max = 100;

    return element;
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }

  private addHandler(el: HTMLElement): void {
    el.addEventListener(EVENTS.Click, () => {
      el.classList.toggle(STYLES.BurgerActive);
      this.levelsPanel?.classList.toggle(STYLES.LevelsOpen);
    });
  }

  private addClickHandler<T extends HTMLElement>(target: T, element: T): void {
    target.addEventListener(EVENTS.Click, () => {
      target.classList.toggle(STYLES.ControlBtnMainActive);
      element.classList.toggle(STYLES.SidebarOpen);
    });
  }
}

export default Sidebar;
