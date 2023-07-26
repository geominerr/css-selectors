import Popup from '../../components/view/popup/popup';
import { EVENTS } from '../../components/view/popup/enum';

describe('createPopup method of Popup class', (): void => {
  let popup: Popup;

  beforeEach((): void => {
    popup = new Popup();
  });

  it('should return HTMLElement', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const popupElement: HTMLElement = popup['createPopup']();

    expect(popupElement instanceof HTMLElement).toBe(true);
  });

  it('should call the private cretateElement and addClickHandler methods', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createElementSpy: jest.SpyInstance = jest.spyOn(popup as any, 'createElement');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addClickHandlerSpy: jest.SpyInstance = jest.spyOn(popup as any, 'addClickHandler');

    // eslint-disable-next-line @typescript-eslint/dot-notation
    popup['createPopup']();

    expect(createElementSpy).toHaveBeenCalled();
    expect(addClickHandlerSpy).toHaveBeenCalled();
  });
});

describe('addClickHandler method of Popup class', (): void => {
  const popup: Popup = new Popup();
  const element: HTMLElement = document.createElement('main');

  const addEventListenerMock: jest.Mock = jest.fn();
  element.addEventListener = addEventListenerMock;

  it('should add click event listener to element', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    popup['addClickHandler'](element);

    expect(element.addEventListener).toHaveBeenCalled();

    const [event, handler] = addEventListenerMock.mock.calls[0];

    expect(event).toBe(EVENTS.Click);
    expect(typeof handler).toBe('function');
  });
});
