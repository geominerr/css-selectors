import { STYLES, TAGNAMES, CONTENT, EVENTS } from './enum';
import './popup.scss';

class Popup {
  private popup: HTMLElement;

  constructor() {
    this.popup = this.createPopup();
  }

  public getPopup(): HTMLElement {
    return this.popup;
  }

  private createPopup(): HTMLElement {
    const container: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.PopupContainer);
    const popup: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.Popup);
    const btn: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.BtnClose);
    popup.innerText = CONTENT.Popup;

    popup.append(btn);
    container.append(popup);

    this.addClickHandler(container);
    return container;
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }

  private addClickHandler(element: HTMLElement): void {
    element.addEventListener(EVENTS.Click, (e: MouseEvent) => {
      const target: EventTarget | HTMLElement | null = e.target;

      if (target && target instanceof HTMLElement) {
        if (
          target.classList.contains(STYLES.BtnClose) ||
          target.classList.contains(STYLES.PopupContainer)
        ) {
          element.classList.remove(STYLES.PopupOpen);
        }
      }
    });
  }
}

export default Popup;
