import { Module } from 'axoncore';

const AD_HOURS = 18;
const AD_MINUTES = 30;

// eslint-disable-next-line no-magic-numbers
const HOUR = 3600 * 1000;
// eslint-disable-next-line no-magic-numbers
const DAY = 24 * HOUR;

class AutoAdvert extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Auto-advert';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'pnj',
            description: 'The PNJ module (check pnj status).',
        };

        // eslint-disable-next-line no-magic-numbers
        this.intervalTime = 24 * HOUR;
        this.channelID = '487048687294480405';

        this.switch = true;

        this.advert();
    }

    init() {
        return { };
    }

    async advert() {
        const today = new Date();
        const now = Date.now();
        const target = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate(), AD_HOURS, AD_MINUTES) );
        
        const sleep = now > target
            ? target + DAY - now
            : target - now;
        
        await this.utils.sleep(sleep);
    
        this.webspellLogo = this.bot.guilds.get('208202248684175360').iconURL;
        this.fortnitroLogo = this.bot.guilds.get('486097909713207296').iconURL;
        
        this.run();
        setInterval( () => {
            this.run();
        }, this.intervalTime * 2);
    }

    run() {
        this.bot.createMessage(this.channelID, this.message).catch(err => this.logger.fatal(`ADVERT: ${err}`) );
        
        this.logger.verbose(`Sent ad message.`);
        this.switch = !this.switch;
    }

    message() {
        return {
            embed: {
                description: "** **\nFortnitro est également présent sur Twitter, de manière plus instantanée ! Partage d'informations officielles, petits sondages amusants et conseils fort appréciables : [rejoignez-nous sur l'oiseau bleu](https://twitter.com/Fortnitro/) !\n** **",
                thumbnail: {
                    url: this.fortnitroLogo,
                },
                author: {
                    name: 'Retrouvez-nous sur Twitter !',
                    icon_url: this.fortnitroLogo,
                },
                color: 16772907,
            },
        };
    }
}

export default AutoAdvert;
