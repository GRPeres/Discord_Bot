require('dotenv').config();
const { Client, IntentsBitField, Role, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    
    {
        id:'1150601199456895037',
        label:'Clientela'
    },
    
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1149723677521346661');
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        }); 

        await channel.send({
            content: 'Claim or remove a role below.',
            components: [row],
        });

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);