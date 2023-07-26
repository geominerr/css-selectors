enum STYLES {
  Footer = 'footer',
  Icon = 'icon',
  IconRss = 'icon--rss',
  IconLink = 'icon__link',
  IconImage = 'icon__img',
  Date = 'date',
}

enum TAGNAMES {
  Footer = 'footer',
  Icon = 'div',
  IconLink = 'a',
  IconImage = 'img',
  Date = 'p',
}

enum CONTENT {
  Date = '© 2023',
}

enum ATTRIBUTES {
  Src = 'src',
  Href = 'href',
  Alt = 'alt',
  HrefValueRSS = 'https://rs.school/js/',
  HrefValueGH = 'https://github.com/geominerr',
  AltValue = 'icon',
}

enum PATH {
  ToIconRSS = './assets/icons/logo-rss.svg',
  ToIconGH = './assets/icons/mark-github.png',
}

export { STYLES, TAGNAMES, CONTENT, ATTRIBUTES, PATH };
