import { STYLES, CONTENTS, TAGNAMES } from './enum';
import './header.scss';

class Header {
  private header: HTMLElement;

  constructor() {
    this.header = this.createHeader();
  }

  public getHeader(): HTMLElement {
    return this.header;
  }

  private createHeader(): HTMLElement {
    const header: HTMLElement = this.createElement(TAGNAMES.Header, STYLES.Header);
    const logo: HTMLElement = this.createElement(TAGNAMES.Div, STYLES.HeaderLogo);
    const title: HTMLElement = this.createElement(
      TAGNAMES.H2,
      STYLES.HeaderTitle,
      CONTENTS.HeaderTitle
    );

    [logo, title].forEach((el: HTMLElement): void => header.append(el));

    return header;
  }

  private createElement(tagName: string, style: string, content?: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    if (content) {
      element.innerText = content;
    }

    return element;
  }
}

export default Header;
