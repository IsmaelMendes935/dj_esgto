const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { Player } = require('discord-music-player');
const { token, prefix } = require('./config.json');
const { execute } = require('./commands/play');
const { clearScreenDown } = require('node:readline');

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
});

client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if(!client.commands.has(command)) {
        await message.reply('Comando errado/inválido.');
        return;
    }
    try {
        await client.commands.get(command)
            .execute(message, args, client);
    } catch(e) {
        console.error(e);
    }
});

client.login(token);