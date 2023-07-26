enum STYLES {
  Container = 'container',
  Title = 'title',
  TableWrapper = 'table-wrapper',
  TableField = 'table',
  TableItem = 'table__item',
  TableItemPopup = 'popup',
  TableEdge = 'table__edge',
  TableEdgeTitle = 'table__title',
  TableItemTarget = 'table__item--target',
  ChildTarget = 'table__item--target-child',
  TableItemOut = 'table__item--out',
  ItemContainer = 'item-container',
}

enum TAGNAMES {
  Container = 'section',
  Title = 'h2',
  TableWrapper = 'div',
  TableField = 'div',
  TableItem = 'div',
  TableEdge = 'div',
  TableEdgeTitle = 'span',
}

enum CONTENT {
  TableEdgeTitle = 'Pioneer',
}

const MODIFICATORS: object = {
  acid: 'table__item--acid',
  pop: 'table__item--pop',
  idm: 'table__item--idm',
  techno: 'table__item--techno',
  jazz: 'table__item--jazz',
  house: 'table__item--house',
  synth: 'table__item--synth',
  tech: 'table__item--tech',
};

export { STYLES, TAGNAMES, CONTENT, MODIFICATORS };
