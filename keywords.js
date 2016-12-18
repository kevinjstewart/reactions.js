// const _SQLITE3 = require('sqlite3').verbose();
// const _DB = new sqlite3.Database('keywords_database.sqlite3'); // Un-implemented

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)]
}

const _Keywords = [
	{
		Name: "Black Eagle",
		Keywords: [
			/black eagle/gi,
			/g(a|(h)?e)y/gi,
		],
		Emojis: [
			[
				"EAGLE",
				"BLACK FLAG",
			],
			"RAINBOW FLAG",
		],
	},
	{
		Name: "Meth",
		Keywords: [
			/meth/gi,
			/crack/gi,
			/pipe/gi,
		],
		Emojis: [
			"METH",
			"PIPE",
		],
	},
	{
		Name: "Cheers",
		Keywords: [
			/cheer(s)?/gi,
			/drink(s)?/gi,
		],
		Emojis: [
			"CLINKING BEER MUGS",
			"BEER MUG",
		]
	},
	{
		Name: "Darts",
		Keywords: [
			/smoke/gi,
			/dart(s)?/gi,
		],
		Emojis: [
			"CIGARETTE",
		]
	}
];

module.exports = {
	get Keywords() {
		return _Keywords;
	},
	SearchKeywords: (msg) => {
		return _Keywords.filter((ke) => ke.Keywords.some((k) => k.test(msg)));
	},
	CreateKeyword: (keyword) => {
		var ke = _Keywords.find((ke) => ke.name === keyword.name);
		if (!ke) {
			_Keywords.push({ Name: keyword.name, Keywords: keyword.Keywords, Emojis: keyword.Emojis });
		}
	},
	UpdateKeyword: (keyword) => {
		var ke = _Keywords.find((ke) => ke.name === keyword.name);
		if (ke) {
			ke.Keywords = keyword.Keywords;
			ke.Emojis = keyword.Emojis;
		}
	},
	DeleteKeyword: (keyword) => {
		var ke = _Keywords.findIndex((ke) => ke.name === keyword.name);
		if (ke != -1) {
			_Keywords.splice(ke, -1);
		}
	},
	CreateOrUpdateKeyword: (keyword) => {
		var ke = _Keywords.find((ke) => ke.name === keyword.name);
		if (ke) {
			ke.Keywords = keyword.Keywords;
			ke.Emojis = keyword.Emojis;
		} else {
			_Keywords.push({ Name: keyword.name, Keywords: keyword.Keywords, Emojis: keyword.Emojis });
		}
	}
};