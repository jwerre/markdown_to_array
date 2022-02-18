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
				{ text: 'This is ', tag: 'P', P: true },
				{ text: 'italics', tag: 'EM', EM: true },
				{ text: ' and this is ', tag: 'P', P: true },
				{ text: 'bold', tag: 'STRONG', STRONG: true },
				{ text: '.', tag: 'P', P: true }
			],
			[
				{ text: 'Here is a ', tag: 'P', P: true },
				{
					text: 'hyperlink',
					tag: 'A',
					A: true,
					href: 'https://surveyplanet.com'
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
			[ { text: 'Here are some lists:', tag: 'P', P: true } ],
			[ { text: 'Ordered List', tag: 'H3', H3: true } ],
			[
				{ text: 'Item 1', tag: 'LI', LI: true },
				{ text: 'Item 2', tag: 'LI', LI: true },
				{ text: 'Item 3', tag: 'LI', LI: true }
			],
			[ { text: 'Unordered List', tag: 'H4', H4: true } ],
			[
				{ text: 'Item 1', tag: 'LI', LI: true },
				{ text: 'Item 2', tag: 'LI', LI: true },
				{ text: 'Item 3', tag: 'LI', LI: true },
				{ text: 'Item 4', tag: 'LI', LI: true }
			]
		]);

	});


});
