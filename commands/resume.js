module.exports = {
    name: 'resume',
    description: 'Resume a song',
    async execute(message = null, args = null, client) {
        let getQueue = client.player.getQueue(message.guild.id);
        if(!getQueue) {
            await message.reply('Nenhuma música esperando para tocar');
            return
        }
        getQueue.setPaused(false);
        await message.reply('Música retomada');
    }
}