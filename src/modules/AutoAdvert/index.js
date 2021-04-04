import { Module } from 'axoncore';

const AD_HOURS = 21;
const AD_MINUTES = 0;

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
        
        this.run();
        setInterval( () => {
            this.run();
        }, this.intervalTime);
    }

    run() {
        this.bot.createMessage(this.channelID, this.switch
            ? this.message1()
            : this.message2() ).catch(err => this.logger.fatal(`ADVERT: ${err}`) );

        this.logger.verbose(`Sent ad message.`);
        this.switch = !this.switch;
    }

    message() {
        return {
            embed: {
                description: "** **\nEn plus d'être présent sur [Twitch](https://twitch.tv/sheldask), Sheldask est également présent sur [Twitter](https://twitter.com/sheldask) et [Instagram](https://instagram.com/sheldask). \nC'est le meilleur moyen d'être au courant de tout, même des imprévus, de ne louper aucun live et de m'apercevoir !",
                thumbnail: {
                    url: 'https://zupimages.net/up/21/12/hkl3.png',
                },
                author: {
                    name: 'Les réseaux sociaux de Sheldask',
                    url: '',
                    icon_url: 'https://zupimages.net/up/21/12/o23m.png',
                },
                color: 13838639,
                footer: {
                    text: 'Allez le suivre sur tous ses réseaux et recevez le badge Follower !',
                },
            },
        };
    }

    message2() {
        return {
            embed: {
                description: "** **\nVous pouvez [suivre](https://twitch.tv/sheldask) Sheldask sur Twitch et vous [abonner](https://www.twitch.tv/sheldask/sub) si vous le pouvez. Regarder les publicités jusqu'au bout aide beaucoup également !\nSur Discord, booster le serveur permet à Sheldask d'améliorer votre expérience sur ce dernier !",
                thumbnail: {
                    url: 'https://zupimages.net/up/21/12/hkl3.png',
                },
                author: {
                    name: 'Les manières de soutenir Sheldask',
                    url: '',
                    icon_url: 'https://zupimages.net/up/21/12/o23m.png',
                },
                color: 13838639,
                footer: {
                    text: "Devenez membre d'honneur et accédez à un salon exclusif !",
                },
            },
        };
    }
}

export default AutoAdvert;
