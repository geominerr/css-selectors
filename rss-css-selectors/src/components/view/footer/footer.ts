import { STYLES, TAGNAMES, CONTENT, ATTRIBUTES, PATH } from './enum';

import './footer.scss';

class Footer {
  private footer: HTMLElement;

  constructor() {
    this.footer = this.createElement(TAGNAMES.Footer, STYLES.Footer);
  }

  public createFooterBlock(): HTMLElement {
    const { footer } = this;
    const iconRss: HTMLElement = this.createIcon('rss');
    const iconGH: HTMLElement = this.createIcon('gh');
    const date: HTMLElement = this.createElement(TAGNAMES.Date, STYLES.Date);

    date.innerText = CONTENT.Date;

    [iconRss, date, iconGH].forEach((el: HTMLElement): void => footer.append(el));

    return footer;
  }

  private createIcon(typeIcon: string): HTMLElement {
    const icon: HTMLElement = this.createElement(TAGNAMES.Icon, STYLES.Icon);
    const link: HTMLElement = this.createElement(TAGNAMES.IconLink, STYLES.IconLink);
    const img: HTMLElement = this.createElement(TAGNAMES.IconImage, STYLES.IconImage);
    const hrefIcon: string = typeIcon === 'rss' ? ATTRIBUTES.HrefValueRSS : ATTRIBUTES.HrefValueGH;
    const pathToIcon: string = typeIcon === 'rss' ? PATH.ToIconRSS : PATH.ToIconGH;

    if (typeIcon === 'rss') {
      icon.classList.add(STYLES.IconRss);
    }

    link.setAttribute(ATTRIBUTES.Href, hrefIcon);
    img.setAttribute(ATTRIBUTES.Src, pathToIcon);
    img.setAttribute(ATTRIBUTES.Alt, ATTRIBUTES.AltValue);

    link.append(img);
    icon.append(link);

    return icon;
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }
}

export default Footer;
