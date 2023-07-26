import Footer from '../../components/view/footer/footer';
import { STYLES, TAGNAMES } from '../../components/view/footer/enum';

describe('createFooterBlock method of Footer class', (): void => {
  let footer: Footer;

  beforeEach((): void => {
    footer = new Footer();
  });

  it('should return HTMLElement', (): void => {
    const element: HTMLElement = footer.createFooterBlock();

    expect(element instanceof HTMLElement).toBe(true);
  });

  it('should call the private cretateElement and createIcon methods', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createElementSpy: jest.SpyInstance = jest.spyOn(footer as any, 'createElement');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createIconSpy: jest.SpyInstance = jest.spyOn(footer as any, 'createIcon');

    footer.createFooterBlock();

    expect(createElementSpy).toHaveBeenCalled();
    expect(createIconSpy).toHaveBeenCalled();
  });
});

describe('createIcon method of Footer class', (): void => {
  let footer: Footer;

  beforeEach((): void => {
    footer = new Footer();
  });

  it('should return HTMLElement', (): void => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const element: HTMLElement = footer['createIcon']('rss');

    expect(element instanceof HTMLElement).toBe(true);
  });

  it('should call the private cretateElement method', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createElementSpy: jest.SpyInstance = jest.spyOn(footer as any, 'createElement');

    // eslint-disable-next-line @typescript-eslint/dot-notation
    footer['createIcon']('rss');

    expect(createElementSpy).toHaveBeenCalled();
  });
});

describe('createElement method of Footer class', (): void => {
  let footer: Footer;

  beforeEach((): void => {
    footer = new Footer();
  });

  it('should return HTMLElement', (): void => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const element: HTMLElement = footer['createElement'](TAGNAMES.Icon, STYLES.Icon);

    expect(element instanceof HTMLElement).toBe(true);
  });

  it('should return element with tag name and style', (): void => {
    const tagName: string = TAGNAMES.Footer;
    const style: string = STYLES.Footer;

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const element: HTMLElement = footer['createElement'](tagName, style);

    expect(element.tagName).toBe(tagName.toUpperCase());
    expect(element.classList.contains(style)).toBe(true);
  });
});
