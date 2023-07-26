import { STYLES, TAGNAMES, CONTENT, MODIFICATORS } from './enum';
import { Selector } from '../../../types/general';
import './table.scss';

class PlayTable {
  private title: HTMLElement | null = null;

  private tableField: HTMLElement | null = null;

  private targetElements: HTMLElement[] = [];

  private playELements: HTMLElement[] = [];

  private popupElements: HTMLElement[] = [];

  constructor() {
    this.tableField = this.createElement(TAGNAMES.TableField, STYLES.TableField);
    this.title = this.createElement(TAGNAMES.Title, STYLES.Title);
  }

  public createTableBlock(titleTable: string, selectors: Selector[]): HTMLElement {
    const { title, tableField, createElement } = this;
    const container: HTMLElement = createElement(TAGNAMES.Container, STYLES.Container);
    const tableWrapper: HTMLElement = createElement(TAGNAMES.TableWrapper, STYLES.TableWrapper);
    const tableEdge: HTMLElement = createElement(TAGNAMES.TableEdge, STYLES.TableEdge);
    const tableTitle: HTMLElement = createElement(TAGNAMES.TableEdgeTitle, STYLES.TableEdgeTitle);

    this.createPlayItems(selectors);
    tableTitle.innerText = CONTENT.TableEdgeTitle;
    tableEdge.append(tableTitle);

    if (tableField && title) {
      title.innerText = titleTable;
      tableWrapper.append(tableField);
      tableWrapper.append(tableEdge);
      container.append(title);
      container.append(tableWrapper);
    }

    return container;
  }

  public updateTable(titleTable: string, selectors: Selector[]): void {
    const { title, tableField } = this;
    this.playELements = [];
    this.popupElements = [];

    if (title && tableField) {
      title.innerText = titleTable;
      tableField.innerHTML = '';

      this.createPlayItems(selectors);
    }
  }

  public removeTargetElement(): void {
    this.targetElements.forEach((el: HTMLElement): void => {
      el.classList.add(STYLES.TableItemOut);
    });

    this.targetElements = [];
  }

  public getTitle(): HTMLElement {
    return this.title as HTMLElement;
  }

  public getTableField(): HTMLElement {
    return this.tableField as HTMLElement;
  }

  public getPlayItems(): HTMLElement[] {
    return this.playELements;
  }

  public getPopupItems(): HTMLElement[] {
    return this.popupElements;
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }

  private createPlayItems(listItems: Selector[]): void {
    listItems.forEach((selector: Selector): void => {
      const itemContainer: HTMLElement = this.createElement(
        TAGNAMES.TableItem,
        STYLES.ItemContainer
      );
      const element: HTMLElement = this.createElement(selector.parent, STYLES.TableItem);
      element.classList.add(MODIFICATORS[selector.parent as keyof object]);
      const popup: HTMLElement = this.createElement(TAGNAMES.TableItem, STYLES.TableItemPopup);
      popup.innerText = `<${selector.parent}></${selector.parent}>`;
      if (selector.classParent) {
        popup.innerText = `<${selector.parent} class="${selector.classParent}"></${selector.parent}>`;
      }
      itemContainer.append(popup);

      if (selector.child) {
        const [child, popupChild] = this.createChildItem(selector);

        this.popupElements.push(popupChild);
        this.playELements.push(child);
        itemContainer.append(popupChild);
        element.append(child);
      }
      if (selector.isTarget) {
        element.classList.add(STYLES.TableItemTarget);
        this.targetElements.push(element);
      }

      itemContainer.append(element);
      this.popupElements.push(popup);
      this.playELements.push(element);
      this.tableField?.append(itemContainer);
    });
  }

  private createChildItem(selector: Selector): HTMLElement[] {
    const child: HTMLElement = this.createElement(selector.child as string, STYLES.TableItem);
    const popup: HTMLElement = this.createElement(TAGNAMES.TableItem, STYLES.TableItemPopup);
    child.classList.add(MODIFICATORS[selector.child as keyof object]);

    if (selector.isChildTarget) {
      child.classList.add(STYLES.ChildTarget);
    }

    const content: string = selector.classChild
      ? `<${selector.child} class="${selector.classChild}"></${selector.child}>`
      : `<${selector.child}></${selector.child}>`;

    popup.innerText = content;

    return [child, popup];
  }
}

export default PlayTable;
