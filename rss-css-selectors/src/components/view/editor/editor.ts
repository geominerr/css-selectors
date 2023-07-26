import { STYLES, TAGNAMES, CONTENT, ATTRIBUTES, EVENTS } from './enum';
import { Selector } from '../../../types/general';
import { Element } from '../../../types/view';
import './editor.scss';

class Editor {
  private inputSelector: HTMLElement;

  private inputField: HTMLInputElement | null = null;

  private htmlSelectors: HTMLElement;

  private targetElements: HTMLElement[];

  private inputButtons: HTMLElement[] = [];

  private editorContainer: HTMLElement | null = null;

  constructor() {
    this.inputSelector = this.createInputSelector();
    this.htmlSelectors = this.createElement(TAGNAMES.InputWrapper, STYLES.InputWrapper);
    this.targetElements = [];
  }

  public createEditorBlock(data: Selector[]): HTMLElement {
    const editorContainer: HTMLElement = this.createElement(
      TAGNAMES.EditorContainer,
      STYLES.EditorContainer
    );
    const cssEditor: HTMLElement = this.createEditor('cssEditor');
    this.createHtmlSelectors(data);
    const htmlViewer: HTMLElement = this.createEditor('htmlViewer');

    this.addInputFocus(editorContainer);

    [cssEditor, htmlViewer].forEach((el: HTMLElement) => editorContainer.append(el));

    this.editorContainer = editorContainer;
    return editorContainer;
  }

  public updateEditor(data: Selector[]): void {
    this.targetElements = [];
    this.htmlSelectors.innerHTML = '';

    this.createHtmlSelectors(data);

    if (this.inputField) {
      if (this.inputField.value.length > 0) {
        this.inputField.value = '';
        this.inputField.classList.remove(STYLES.InputFilled);
      }
    }
  }

  public addAnimation(): void {
    this.editorContainer?.classList.add(STYLES.EditorAnimation);

    setTimeout(() => {
      this.editorContainer?.classList.remove(STYLES.EditorAnimation);
    }, 800);
  }

  public getTargetElements(): HTMLElement[] {
    return this.targetElements;
  }

  public getInputButtons(): HTMLElement[] {
    return this.inputButtons;
  }

  public getInputField(): HTMLElement {
    return this.inputField as HTMLElement;
  }

  private createEditor(type: Element): HTMLElement {
    const editor: HTMLElement = this.createElement(TAGNAMES.Editor, STYLES.Editor);
    const editorHeader: HTMLElement = this.createElement(
      TAGNAMES.EditorHeader,
      STYLES.EditorHeader
    );
    const editorTitle: HTMLElement = this.createElement(TAGNAMES.EditorTitle, STYLES.EditorTitle);
    const editorSubtitle: HTMLElement = this.createElement(
      TAGNAMES.EditorSubTitle,
      STYLES.EditorSubTitle
    );
    const listNumbers: HTMLElement = this.createListNumbers();
    let elementToInsert: HTMLElement | null = null;

    if (type === 'cssEditor') {
      const inputWrapper: HTMLElement = this.createElement(
        TAGNAMES.InputWrapper,
        STYLES.InputWrapper
      );
      const inputDesc: HTMLElement = this.createElement(TAGNAMES.InputDesc, STYLES.InputDesc);
      inputDesc.innerText = CONTENT.CssDescription;
      inputWrapper.classList.add(STYLES.InputWrapperCss);
      inputWrapper.append(this.inputSelector);
      inputWrapper.append(inputDesc);
      listNumbers.classList.add(STYLES.ListCss);
      editorTitle.innerText = CONTENT.CssEditorTitle;
      editorSubtitle.innerText = CONTENT.CssEditorSubtitle;
      elementToInsert = inputWrapper;
    } else {
      editorTitle.innerText = CONTENT.HtmlViewerTitle;
      editorSubtitle.innerText = CONTENT.HtmlViewerSubtitle;
      elementToInsert = this.htmlSelectors;
    }
    [editorTitle, editorSubtitle].forEach((el: HTMLElement): void => editorHeader.append(el));
    [editorHeader, listNumbers, elementToInsert].forEach((el: HTMLElement): void =>
      editor.append(el)
    );

    return editor;
  }

  private createElement(tagName: string, style: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(style);

    return element;
  }

  private createInputSelector(): HTMLElement {
    const inputSelector: HTMLElement = this.createElement(
      TAGNAMES.InputContainer,
      STYLES.InputContainer
    );
    const inputField: HTMLInputElement = this.createElement(
      TAGNAMES.Input,
      STYLES.Input
    ) as HTMLInputElement;
    const btnEnter: HTMLElement = this.createElement(TAGNAMES.Button, STYLES.Button);
    const btnHelp: HTMLElement = this.createElement(TAGNAMES.Button, STYLES.Button);

    inputField.setAttribute(ATTRIBUTES.Type, ATTRIBUTES.TypeValue);
    inputField.setAttribute(ATTRIBUTES.Placeholder, ATTRIBUTES.PlaceholderValue);

    this.addBlinkEffect(inputField);
    this.inputField = inputField;

    btnEnter.innerText = CONTENT.ButtonEnter;
    btnHelp.innerText = CONTENT.ButtonHelp;

    [inputField, btnEnter, btnHelp].forEach((el: HTMLElement): void => {
      inputSelector.append(el);

      if (el !== inputField) {
        this.inputButtons.push(el);
      }
    });

    return inputSelector;
  }

  private createHtmlSelectors(data: Selector[]): void {
    const fakeTable: HTMLElement = this.createElement(TAGNAMES.Selector, STYLES.Selector);
    const textNodeBefore: Node = document.createTextNode('<div  class="pioneer">');
    const textNodeAfter: Node = document.createTextNode('</div>');

    fakeTable.append(textNodeBefore);

    data.forEach((el: Selector): void => {
      const selector: HTMLElement = this.createElement(TAGNAMES.Selector, STYLES.Selector);

      if (el.child) {
        let textBeforeChild: Node = document.createTextNode(`<${el.parent}>`);
        if (el.classParent) {
          textBeforeChild = document.createTextNode(`<${el.parent} class="${el.classParent}">`);
        }
        const textAfterChild: Node = document.createTextNode(`</ ${el.parent}>`);
        const child: HTMLElement = this.createElement(TAGNAMES.Selector, STYLES.Selector);
        child.innerText = `<${el.child} />`;
        if (el.classChild) {
          child.innerText = `<${el.child} class="${el.classChild}"/>`;
        }
        this.targetElements.push(child);

        [textBeforeChild, child, textAfterChild].forEach((elem: Node | HTMLElement) =>
          selector.append(elem)
        );
      } else {
        selector.innerText = el.classParent
          ? `<${el.parent} class="${el.classParent}"/>`
          : `<${el.parent} />`;
      }

      this.targetElements.push(selector);
      fakeTable.append(selector);
    });

    fakeTable.append(textNodeAfter);

    this.htmlSelectors.append(fakeTable);
  }

  private createListNumbers(): HTMLElement {
    const list: HTMLElement = this.createElement(TAGNAMES.List, STYLES.List);
    const amountListItems: number = 15;

    for (let i: number = 1; i <= amountListItems; i += 1) {
      const listItem: HTMLElement = this.createElement(TAGNAMES.ListItem, STYLES.ListItem);
      listItem.innerText = `${i}`;

      list.append(listItem);
    }

    return list;
  }

  private addBlinkEffect(input: HTMLInputElement): void {
    input.addEventListener(EVENTS.Input, (): void => {
      if (input.value.length > 0) {
        input.classList.add(STYLES.InputFilled);
      } else {
        input.classList.remove(STYLES.InputFilled);
      }
    });
  }

  private addInputFocus(mainElement: HTMLElement): void {
    mainElement.addEventListener(EVENTS.Click, (): void => {
      if (this.inputField) {
        this.inputField.focus();
      }
    });
  }
}

export default Editor;
