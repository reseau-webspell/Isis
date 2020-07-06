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

        this.welcomeChannelID = '603229947598733345';

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
        return this.sendMessage(guild.channels.get(this.welcomeChannelID), `** **\nBienvenue sur le Discord de \`Fortnitro\` ${member.mention} ! Nous t'invitons à valider le \`règlement\` dans #accueil pour accéder à l'ensemble du serveur. N'hésites pas à envoyer un message au \`staff\` en cas de besoin !\n** **`);
    }
}

export default Welcome;
