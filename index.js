
const HTMLParser = require('node-html-parser');
const marked = require('marked');


class MdDom {
	
	constructor(md) {
		
		this._md = md;
		
		this._html;
		
	}
	
	get markdown () { return this._md; }

	get html () { 

		if (this._html) {
			return this._html;
		}
		
		this._html = marked(this.markdown);
		
		return this._html;
	}
	
	parse (options={}) {
		
		options.lowerCaseTagName = true;
		let tree = [];

		const flatten = (nodes, parent) => {
			
			if ((nodes.childNodes && nodes.childNodes.length)) {
				return flatten(nodes.childNodes, nodes.tagName);
			}
			
			if (nodes && nodes.length) {

				tree.push([]);
				
				nodes.forEach( (node) => {
					
					if (node && node.rawText !== '\n') {
						
						let item = this.parseNode(node, parent);
						tree[tree.length-1].push(item);

					}
				});

			}
			
		};
		
		const root = HTMLParser.parse(this.html, options);
		
		for (let item of root.childNodes) {
			flatten(item);
		}

		return tree;

	}
	
	
	parseNode (node, parent) {
		
		let res = {};
		
		// this helps with h1-h6
		if (!node.tagName && parent && parent.length && parent !== 'p') {
			node.tagName = parent;
		}
		
		if (node.rawText && node.rawText.length) {
			res.text = node.rawText;
		}

		if (node.tagName && node.tagName.length) {
			res.tag = node.tagName;
			res[node.tagName] = true;
		}

		if (node.rawAttrs && node.rawAttrs.length) {
			for (const attr in node.attributes) {
				res[attr] = node.attributes[attr];
			}
		}
		
		switch (node.tagName) {
		case 'li':
			res.parent = node.parentNode.tagName;
			res.ordered = res.parent === 'ol';
			res.unordered = !res.ordered;
			break;
		case 'a':
			delete res.a;
			res.link =  true;
			break;
		case 'img':
			delete res.img;
			res.image =  true;
			break;
		case 'em':
			delete res.em;
			res.italics =  true;
			break;
		case 'strong':
			delete res.strong;
			res.bold = true;
			break;
		default:
		}
		
		return res;

	}

}

module.exports = MdDom;
