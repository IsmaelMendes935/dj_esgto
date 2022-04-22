module.exports = {
    name: 'play',
    description: 'Play a song',
    async execute(message, args, client) {
        let guildQueue = client.player.getQueue(message.guild.id);

        if(!message.member.voice.channel) {
            await message.reply('Entre em um canal de voz');
        } else {
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(e => {
                if(!guildQueue) queue.stop();
            });
        }
    },
}