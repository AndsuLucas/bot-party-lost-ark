const { Client, GatewayIntentBits } = require('discord.js');
const { commandPrefix, token, availableCommands } = require('./config.json');
const fs = require('fs');
console.log(	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages);
const client = new Client({
    intents: [	
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
});


client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {

	if (!message) {
		return;
	}

	console.log(1)
	if (message.author.bot) {
		return;
	}
	console.log(2)
	if (!message.content) {
		return;
	}

	const isCommand = message.content.indexOf(commandPrefix) == 0;
	if (!isCommand) {
		return;
	}

	const command = message.content;
	const commandArgs = command.split(' ');
	const hasEnoughArguments = commandArgs.length == 3;
	if (!hasEnoughArguments) {
		return message.reply({content: "Comando inválido."});
	}

	const initialCommand = commandArgs[0] || '';

	const isValidCommand = availableCommands.indexOf(
		initialCommand.toString().replace(commandPrefix, '')
	) != -1;

	if (!isValidCommand) {
		return message.reply({content: "Comando inválido."});
	}

	const validPartyTypes = [
		'oreha',
		'argos',
		'valtan',
		'vykas'
	];

	const partyName = commandArgs[1];
	const partyType = commandArgs[2];
	
	const isValidPartyType = validPartyTypes.indexOf(partyType) != -1;
	if (!isValidPartyType) {
		return message.reply({content: "Comando inválido."});
	}

	const persistenceFileName = `persistence/${partyType}.json`;
	const partyInfo = JSON.parse(fs.readFileSync(persistenceFileName, 'utf8'));
	
	const partyAlreadyBeenCreated = partyInfo.party[partyName] != undefined;
	if (partyAlreadyBeenCreated) {
		return message.reply({content: "Já existe uma pt com este nome. Por favor utilize outro."});
	}

	partyInfo.party[partyName] = {}

	fs.writeFile(persistenceFileName, JSON.stringify(partyInfo), function(err) {
		if (err) {
			return message.reply({content: "Erro ao rodar comando. Contate os oficiais."});
		}

		message.reply(
			{
				content: `
					Pt para ${partyType} criada com sucesso! Pra entrar digite: "!entraPt ${partyName} ${partyType}"
				`
			}
		);
	});
});

client.login(token);