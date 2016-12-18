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

function _UpdateGuildEmojis() {
	_Client.guilds.forEach((guild) => {
		guild.emojis.forEach((emoji) => {
			_Emojis.CreateOrUpdate({name: emoji.name, code: emoji.id, type: "EMOJI_SERVER"});
		});
	});
}

function _addMessageReaction(msg, emoji) {
	var e = _Emojis.ResolveEmoji(_Emojis.EmojiByName(emoji));
	_Client.addMessageReaction(msg.channel.id, msg.id, e).then((msg) => { }, (err) => { });
}

_Client.on('ready', () => {
	_UpdateGuildEmojis();
	_Client.guilds.forEach((guild) => {
		_Client.editNickname(guild.id, _Config.Nickname);
	});
});

_Client.on('connect', () => {
});

_Client.on('reconnecting', () => {
});

_Client.on('disconnect', () => {
});

_Client.on('guildMemberUpdate', (guild, member, oldMember) => {
	if (member.user == _Client.user) {
		_Client.editNickname(guild.id, _Config.Nickname);
	}
});

_Client.on('messageCreate', (msg) => {
	if (msg.author != _Client.user) {
		var ke = _KeywordEmojis.SearchKeywords(msg.content);
		ke.forEach((ke) => {
			var r = ke.Emojis.random();
			if (Array.isArray(r)) {
				r.forEach((t) => {
					_addMessageReaction(msg, t);
				});
			} else {
				_addMessageReaction(msg, r);
			}
		});
	}
});

_Client.on('messageUpdate', (oldMsg, newMsg) => {
	if (msg.author != _Client.user) {

	}
});

_Client.on('messageDelete', (msg) => {
	if (msg.author != _Client.user) {

	}
});

_Client.on('messageReactionAdd', (msg, emoji, userid) => {
	if (msg.author != _Client.user) {
		_Client.addMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

_Client.on('messageReactionRemove', (msg, emoji, userid) => {
	if (msg.author != _Client.user) {
		_Client.removeMessageReaction(msg.channel.id, msg.id, emoji.name).then((msg) => { }, (err) => { });
	}
});

process.on('SIGINT', function () {
	_Client.disconnect({reconnect: false});
});

_Client.connect();