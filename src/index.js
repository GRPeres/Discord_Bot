require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);

    client.user.setActivity({
        name:'Beep Boop',
        type: ActivityType.Custom,
    })
});

client.on('interactionCreate', async (interaction) => {

    try {
        if (interaction.commandName === 'info') {

            interaction.reply(`O usuario ${interaction.user} me chamou.`);
        } 
    } catch (error) {
        console.log(error);
    }

    try {
        if(!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);

        if(!role){
            interaction.editreply({
                content: 'Não foi possível encontrar o Cargo.',
            })
            return;
        }
    
        const hasRole = interaction.member.roles.cache.has(role.id);
    
        if (hasRole){
            await interaction.member.roles.remove(role);
            await interaction.editReply(`O cargo: ${role}, foi removido.`);
            return;
        }
    
        await interaction.member.roles.add(role);
        await interaction.editReply(`O cargo: ${role}, foi adicionado.`);
        
    } catch (error) {
        console.log(error);
    }
    
});

client.login(process.env.TOKEN);
