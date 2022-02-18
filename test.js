const MdToArray = require('./index.js');
const assert = require('assert');

describe('Markdown to array', function() {

	// before(function(done) {});
	// after( function (done) {});

	it('should parse some inline markdown', function() {

		const md = `\
This is *italics* and this is **bold**.

Here is a [hyperlink](https://surveyplanet.com)!
			
Here are some **images**: ![some alt text](https://example.com/img1.png)
	
![](https://example.com/img2.png)`;

		const mdDom = new MdToArray(md);

		assert.equal(mdDom.markdown, md);
		assert.ok(/^<p>.+/.test(mdDom.html));

		let parsed;

		try {
			parsed = mdDom.parse();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(parsed);

		assert.deepStrictEqual(parsed, [
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
					href: 'https://surveyplanet.com',
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
		]);

	});

	it('should parse some block level markdown', function() {

		const md = `\
Here are some lists:

### Ordered List
			
1. Item 1
1. Item 2
1. Item 3

#### Unordered List

- Item 1
- Item 2
- Item 3
- Item 4

`;

		const mdDom = new MdToArray(md);

		assert.equal(mdDom.markdown, md);
		let parsed;

		try {
			parsed = mdDom.parse();
		} catch (err) {
			assert.fail(err);
		}

		assert.ok(parsed);

		assert.deepStrictEqual(parsed, [
			[
				{
					text: 'Here are some lists:'
				}
			],
			[
				{
					text: 'Ordered List',
					tag: 'h3',
					h3: true
				}
			],
			[
				{
					text: 'Item 1',
					tag: 'li',
					li: true,
					parent: 'ol',
					ordered: true,
					unordered: false
				},
				{
					text: 'Item 2',
					tag: 'li',
					li: true,
					parent: 'ol',
					ordered: true,
					unordered: false
				},
				{
					text: 'Item 3',
					tag: 'li',
					li: true,
					parent: 'ol',
					ordered: true,
					unordered: false
				}
			],
			[
				{
					text: 'Unordered List',
					tag: 'h4',
					h4: true
				}
			],
			[
				{
					text: 'Item 1',
					tag: 'li',
					li: true,
					parent: 'ul',
					ordered: false,
					unordered: true
				},
				{
					text: 'Item 2',
					tag: 'li',
					li: true,
					parent: 'ul',
					ordered: false,
					unordered: true
				},
				{
					text: 'Item 3',
					tag: 'li',
					li: true,
					parent: 'ul',
					ordered: false,
					unordered: true
				},
				{
					text: 'Item 4',
					tag: 'li',
					li: true,
					parent: 'ul',
					ordered: false,
					unordered: true
				}
			]
		]);

	});


});
