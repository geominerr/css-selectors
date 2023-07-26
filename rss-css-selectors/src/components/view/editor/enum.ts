enum STYLES {
  EditorContainer = 'editor-container',
  EditorAnimation = 'editor-container--animation',
  Editor = 'editor',
  EditorHeader = 'editor__header',
  EditorTitle = 'editor__title',
  EditorSubTitle = 'editor__subtitle',
  InputWrapper = 'input-wrapper',
  InputWrapperCss = 'input-wrapper--light',
  InputContainer = 'input-container',
  InputDesc = 'input__description',
  Input = 'input',
  InputFilled = 'input--filled',
  Button = 'btn',
  List = 'list',
  ListCss = 'list--light',
  ListItem = 'list__item',
  Selector = 'selector',
}

enum TAGNAMES {
  EditorContainer = 'section',
  Editor = 'div',
  EditorHeader = 'div',
  EditorTitle = 'h3',
  EditorSubTitle = 'span',
  InputWrapper = 'div',
  InputContainer = 'div',
  InputDesc = 'p',
  Input = 'input',
  Button = 'button',
  List = 'ul',
  ListItem = 'li',
  Selector = 'div',
}

enum CONTENT {
  CssEditorTitle = 'CSS Editor',
  CssEditorSubtitle = 'style.css',
  HtmlViewerTitle = 'HTML Viewer',
  HtmlViewerSubtitle = 'table.html',
  ButtonEnter = 'Enter',
  ButtonHelp = 'Help',
  CssDescription = `{
                    /* Styles would go here. */
                    }`,
}

enum ATTRIBUTES {
  Type = 'type',
  TypeValue = 'text',
  Placeholder = 'placeholder',
  PlaceholderValue = 'Type in a CSS selector',
}

enum EVENTS {
  Input = 'input',
  Click = 'click',
}

export { STYLES, TAGNAMES, CONTENT, ATTRIBUTES, EVENTS };
