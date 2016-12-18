Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const _Path = require('path');
const _Config = require(_Path.join(__dirname, 'config.json'));
const _UTF8 = require('utf8');
const _Emojis = require(_Path.join(__dirname, 'emoji.js'));
const _KeywordEmojis = require(_Path.join(__dirname, 'keywords.js'));
const _ErisApi = require("eris");
const _Client = new _ErisApi(_Config.Token);

_Client.on('ready', () => {
	console.log("Connected");
	_Client.guilds.forEach((guild) => {
		guild.emojis.forEach((emoji) => {
			_Emojis.CreateEmoji({name: emoji.name, code: emoji.id, type: "EMOJI_SERVER"});
		});
	});
});

_Client.on('connect', () => {
	console.log('Connecting');
});

_Client.on('reconnecting', () => {
	console.log('Reconnecting');
});

_Client.on('disconnect', () => {
	console.log('Disconnected');
});

_Client.on('messageCreate', (msg) => {
	if (msg.author != _Client) {
		var ke = _KeywordEmojis.SearchKeywords(msg.content);
		ke.forEach((ke) => {
			var e = _Emojis.ResolveEmoji(_Emojis.EmojiByName(ke.Emojis.random()));
			_Client.addMessageReaction(msg.channel.id, msg.id, e).then((msg) => { }, (err) => { });
		});
	}
});

_Client.on('messageUpdate', (oldMsg, newMsg) => {
	if (msg.author != _Client) {

	}
});

_Client.on('messageDelete', (msg) => {
	if (msg.author != _Client) {

	}
});

_Client.on('messageReactionAdd', (msg, emoji, userid) => {
	if (msg.author != _Client) {
		_Client.addMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

_Client.on('messageReactionRemove', (msg, emoji, userid) => {
	if (msg.author != _Client) {
		_Client.removeMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

process.on('SIGINT', function () {
	_Client.disconnect({reconnect: false});
});

_Client.connect();