module.exports = {
    name: 'play',
    description: 'Play a song',
    async execute(message, client, prefix) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift();
        let guildQueue = client.player.getQueue(message.guild.id);
        
        if(command !== this.name) {
            message.reply('Comando errado');
            return;
        }

        if(!message.member.voice.channel) {
            message.reply('Entre em um canal de voz');
        } else {
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(e => {
                if(!guildQueue) queue.stop();
            });
        }
    },
}