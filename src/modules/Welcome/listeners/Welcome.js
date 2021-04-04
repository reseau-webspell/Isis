import { Listener } from 'axoncore';
import { readFileSync } from 'fs';

class Welcome extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'guildMemberAdd';
        /** Event name (Function name) */
        this.label = 'welcome';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'welcome user upon join',
        };

        this.welcomeChannelID = '820462549002616832';

        this.imageBuffer = readFileSync(`${__dirname}/../Banniere_bienvenue.png`);
    }

    async execute(guild, member, guildConfig) { // eslint-disable-line no-unused-vars
        if (guild.id !== '486097909713207296') { // fortnitro server
            return false;
        }
        await this.bot.createMessage(this.welcomeChannelID, '', {
            file: this.imageBuffer,
            name: 'banniere.png',
        } );
        return this.sendMessage(guild.channels.get(this.welcomeChannelID), `** **\nBienvenue sur le Discord de la \`Sheldarmy\` ${member.mention} ! Amuse-toi bien parmi nous et n'hésites pas à envoyer un message au \`staff\` en cas de besoin ! <:daskwink:817444251914076220>\n** **`);
    }
}

export default Welcome;
