import { Module } from 'axoncore';

const AD_HOURS = 18;
const AD_MINUTES = 30;

// eslint-disable-next-line no-magic-numbers
const HOUR = 3600 * 1000;
// eslint-disable-next-line no-magic-numbers
const DAY = 24 * HOUR;

class PNJ extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Pnj';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'pnj',
            description: 'The PNJ module (check pnj status).',
        };

        // eslint-disable-next-line no-magic-numbers
        this.intervalTime = 24 * HOUR;
        this.channelID = '603229947598733345';

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
        }, this.intervalTime);
    }

    run() {
        this.bot.createMessage(this.channelID, this.switch
            ? this.message1()
            : this.message2() ).catch(err => this.logger.fatal(`ADVERT: ${err}`) );
        
        this.logger.verbose(`Sent ad message.`);
        this.switch = !this.switch;
    }

    message1() {
        return {
            embed: {
                description: "** **\nFortnitro est membre du réseau WebSPELL. Ce réseau a pour objectif de rassembler les joueurs de diverses licences sur des sites et des serveurs Discord, sans que les communautés n'aient à dépenser le moindre argent. Pour plus ample information, merci de vous rendre sur le [site de WebSPELL](https://webspell.fr/) ou sur le [Discord du réseau](https://discord.gg/ZHndGnn).\n** **",
                fields: [
                    {
                        name: 'Sites du réseau',
                        value: '[Splashtoon](https://splashtoon.fr/)\n[Nook actu](https://animal-crossing.fr/)\n** **',
                        inline: true,
                    },
                    {
                        name: 'Discord du réseau',
                        value: '[Splashtoon](https://discord.gg/eytWKFs)\n[Nook actu](https://discord.gg/8YsMyGg)\n** **',
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: this.webspellLogo,
                },
                author: {
                    name: 'Présentation du réseau WebSPELL',
                    icon_url: this.webspellLogo,
                },
                color: 3500227,
            },
        };
    }

    message2() {
        return {
            embed: {
                description: "** **\nFortnitro, c'est aussi un site internet ! Actualités, wiki français, retrouvez tout ce dont vous avez besoin pour vivre la meilleure expérience de jeu possible. N'hésitez pas à venir lire nos articles, à les commenter et à les partager ! \n\nRetrouvez-nous également sur Twitter de manière plus instantanée ! Partage d'informations officielles, tweet notifiant l'arrivée d'un nouvel article, petits sondages amusants, rejoignez-nous sur l'oiseau bleu !\n** **",
                fields: [
                    {
                        name: 'Site internet ',
                        value: '[Actualités Battle Royale](https://fortnitro.fr/category/fortnite/battle-royale/)\n[Actualités Sauver le monde](https://fortnitro.fr/category/fortnite/sauver-le-monde/)\n[Actualités Mode créatif](https://fortnitro.fr/category/fortnite/mode-creatif/)\n** **',
                        inline: true,
                    },
                    {
                        name: 'Réseaux sociaux',
                        value: '[Discord](https://www.discord.gg/yHGk5kq)\n[Twitter](https://twitter.com/Fortnitro/)\n[Tipeee](https://fr.tipeee.com/webspell)\n** **',
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: this.fortnitroLogo,
                },
                author: {
                    name: 'Nos réseaux sociaux',
                    icon_url: this.fortnitroLogo,
                },
                color: 16772907,
            },
        };
    }
}

export default PNJ;
