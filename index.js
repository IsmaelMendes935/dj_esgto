const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { Player } = require('discord-music-player');
const { token, prefix } = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

const player = new Player(client);

client.player = player;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot ready');
    console.log(client.commands.keys());
});

client.on('messageCreate', async message => {
    client.commands.get('play').execute(message, client, prefix);
});

client.login(token);