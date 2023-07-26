import Header from './header/header';
import PlayTable from './table/table';
import Editor from './editor/editor';
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import Popup from './popup/popup';
import { STYLES, TAGNAMES } from './enum';
import { LevelData } from '../../types/model';
import { Selector } from '../../types/general';
import IViewElements from '../../types/controller';

class AppView {
  private header: Header;

  private table: PlayTable;

  private editor: Editor;

  private footer: Footer;

  private sidebar: Sidebar;

  private popup: Popup;

  constructor() {
    this.header = new Header();
    this.table = new PlayTable();
    this.editor = new Editor();
    this.footer = new Footer();
    this.sidebar = new Sidebar();
    this.popup = new Popup();
  }

  public renderPage(levelData: LevelData, levelDesc: string[], indexLevel: number): void {
    const body: HTMLElement | null = document.querySelector(TAGNAMES.Body);
    const wrapper: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.Wrapper);

    const title: string = levelData[0];
    const selectors: Selector[] = levelData[1];
    const taskTitles: string[] = levelData[2];

    wrapper.append(this.header.getHeader());
    wrapper.append(this.table.createTableBlock(title, selectors));
    wrapper.append(this.editor.createEditorBlock(selectors));
    wrapper.append(this.footer.createFooterBlock());

    body?.append(wrapper);
    body?.append(this.sidebar.createSidebarBlock(taskTitles, levelDesc, indexLevel));
    body?.append(this.popup.getPopup());
  }

  public addGameResultAnimation(): void {
    this.editor.addAnimation();
  }

  public updatePage(levelData: LevelData, levelDesc: string[], indexLevel: number): void {
    const title: string = levelData[0];
    const selectors: Selector[] = levelData[1];

    this.table.updateTable(title, selectors);
    this.editor.updateEditor(selectors);
    this.sidebar.updateSidebar(levelDesc, indexLevel);
  }

  public getElements(): IViewElements {
    const tableField: HTMLElement = this.table.getTableField();
    const playElements: HTMLElement[] = this.table.getPlayItems();
    const popupElements: HTMLElement[] = this.table.getPopupItems();
    const htmlSelectors: HTMLElement[] = this.editor.getTargetElements();
    const inputButtons: HTMLElement[] = this.editor.getInputButtons();
    const inputField: HTMLElement = this.editor.getInputField();
    const buttonsControl: HTMLElement[] = this.sidebar.getControlButtons();
    const sidebarTitle: HTMLElement = this.sidebar.getTitle();
    const levelsPanel: HTMLElement = this.sidebar.getLevelsPanel();
    const levelsList: HTMLElement[] = this.sidebar.getLevelsList();
    const popup: HTMLElement = this.popup.getPopup();

    return {
      tableField,
      playElements,
      popupElements,
      htmlSelectors,
      inputButtons,
      inputField,
      buttonsControl,
      sidebarTitle,
      levelsPanel,
      levelsList,
      popup,
    };
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }
}

export default AppView;
