# Markdown to Array

Convert markdown text to a simplified DOM array.

### Install

```bash
npm install --save @jwerre/markdown_to_array
```

#### NOTE: use `@jwerre/markdown_to_array` instead of `markdown_to_array`

### Example

```js

MdToArray = require('markdown_to_array')
const md = `\
This is *italics* and this is **bold**.

- list item 1
- list item 2
- list item 3

Here is a [hyperlink](https://example.com)!

Here are some **images**: ![some alt text](https://example.com/img1.png)

![](https://example.com/img2.png)`;

const mdDom = new MdToArray(md);
const parsed = mdDom.parse();
console.log(parsed);
```

#### Result:
```js
[
  [
    { text: 'This is ', tag: 'P', P: true },
    { text: 'italics', tag: 'EM', EM: true },
    { text: ' and this is ', tag: 'P', P: true },
    { text: 'bold', tag: 'STRONG', STRONG: true },
    { text: '.', tag: 'P', P: true }
  ],
  [
    { text: 'list item 1', tag: 'LI', LI: true },
    { text: 'list item 2', tag: 'LI', LI: true },
    { text: 'list item 3', tag: 'LI', LI: true }
  ],
  [
    { text: 'Here is a ', tag: 'P', P: true },
    {
      text: 'hyperlink',
      tag: 'A',
      A: true,
      href: 'https://example.com'
    },
    { text: '!', tag: 'P', P: true }
  ],
  [
    { text: 'Here are some ', tag: 'P', P: true },
    { text: 'images', tag: 'STRONG', STRONG: true },
    { text: ': ', tag: 'P', P: true },
    {
      tag: 'IMG',
      IMG: true,
      src: 'https://example.com/img1.png',
      alt: 'some alt text'
    }
  ],
  [
    {
      tag: 'IMG',
      IMG: true,
      src: 'https://example.com/img2.png',
      alt: ''
    }
  ]
]
```
