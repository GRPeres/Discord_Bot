require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
 
const commands = [
    /*{
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name:'first-number',
                description: 'The first number to add',
                type: ApplicationCommandOptionType.Number,

                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                ], 
                
                required: true,
            },
            {
                name:'second-number',
                description: 'The second number to add',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },  
        ]
    }, */
    
    {
        name: 'TFT-Randomize',
        description: 'Te da uma comp aleatoria pro tft',
    },

    {
        name: 'info',
        description: 'Shows user info',
        
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.
            GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were registered successfully!');

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}) ();