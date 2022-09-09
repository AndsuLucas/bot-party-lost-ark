const { Client, GatewayIntentBits } = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'add') {
        fs.writeFile('tmp/test', "xd", function(err) {
            if (err) {
                console.log(err);
            }
        });
		await interaction.reply('VIADIN FULERO JOGADOR DE DESTROYER!');
	} else if (commandName === 'get') {
        const item = localStorage.getItem('item');
		await interaction.reply(item);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(token);