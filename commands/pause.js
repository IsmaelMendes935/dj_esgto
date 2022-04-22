module.exports = {
    name: 'pause',
    description: 'Pause a song',
    async execute(message = null, args = null, client) {
        let guildQueue = client.player.getQueue(message.guild.id);
        if(!guildQueue) {
            await message.reply('Nenhuma música está tocando');
            return
        }
        guildQueue.setPaused(true);
        await message.reply('Música pausada');
    }
}