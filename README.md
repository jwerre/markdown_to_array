# Markdown DOM

Convert markdown text to a simplified DOM array. 

### Install

```bash
npm install --save markdown_dom
```

### Example

```js

MdDom = require('markdown_dom')
const md = `\
This is *italics* and this is **bold**.

Here is a [hyperlink](https://example.com)!
	
Here are some **images**: ![some alt text](https://example.com/img1.png)

![](https://example.com/img2.png)`;

const mdDom = new MdDom(md);
const parsed = mdDom.parse();
console.log(parsed);
/*
[
	[
		{
			text: 'This is '
		},
		{
			text: 'italics',
			tag: 'em',
			italics: true,
		},
		{
			text: ' and this is '
		},
		{
			text: 'bold',
			tag: 'strong',
			bold: true,
		},
		{
			text: '.'
		},
	],
	[
		{
			text: 'Here is a '
		},
		{
			text: 'hyperlink',
			tag: 'a',
			href: 'https://example.com',
			link: true,
		},
		{
			text: '!'
		}
	],
	[
		{
			text: 'Here are some '
		},
		{
			text: 'images',
			tag: 'strong',
			bold: true,
		},
		{
			text: ': '
		},
		{
			tag: 'img',
			image: true,
			src: 'https://example.com/img1.png',
			alt: 'some alt text'
		}
	],
	[
		{
			tag: 'img',
			image: true,
			src: 'https://example.com/img2.png',
			alt: ''
		}
	]
]
*/

```
