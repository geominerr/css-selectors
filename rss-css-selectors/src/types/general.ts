type Selector = {
  parent: string;
  child?: string;
  isTarget?: boolean;
  isChildTarget?: boolean;
  classChild?: string;
  classParent?: string;
};

type DataTable = {
  title: string;
  selectors: Selector[];
};

export { Selector, DataTable };
