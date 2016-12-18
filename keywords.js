Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const _Keywords = [
	{
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
		Keywords: [
			/cheers/gi,
		],
		Emojis: [
			"CLINKING BEER MUGS",
			"BEER MUG",
		]
	},
	{
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
	}
};