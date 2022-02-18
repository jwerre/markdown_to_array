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
    { text: 'This is ' },
    { text: 'italics', tag: 'em', italics: true },
    { text: ' and this is ' },
    { text: 'bold', tag: 'strong', bold: true },
    { text: '.' }
  ],
  [
    {
      text: 'list item 1',
      tag: 'li',
      li: true,
      parent: 'ul',
      ordered: false,
      unordered: true
    },
    {
      text: 'list item 2',
      tag: 'li',
      li: true,
      parent: 'ul',
      ordered: false,
      unordered: true
    },
    {
      text: 'list item 3',
      tag: 'li',
      li: true,
      parent: 'ul',
      ordered: false,
      unordered: true
    }
  ],
  [
    { text: 'Here is a ' },
    {
      text: 'hyperlink',
      tag: 'a',
      href: 'https://example.com',
      link: true
    },
    { text: '!' }
  ],
  [
    { text: 'Here are some ' },
    { text: 'images', tag: 'strong', bold: true },
    { text: ': ' },
    {
      tag: 'img',
      src: 'https://example.com/img1.png',
      alt: 'some alt text',
      image: true
    }
  ],
  [
    {
      tag: 'img',
      src: 'https://example.com/img2.png',
      alt: '',
      image: true
    }
  ]
]

```
