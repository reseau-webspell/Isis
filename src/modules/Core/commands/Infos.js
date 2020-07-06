import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

class Infos extends Command {
    constructor(module) {
        super(module);

        this.label = 'infos';
        this.aliases = ['infos', 'info'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'infos',
            description: 'Affiche toutes les commandes.',
            usage: 'infos',
            examples: ['infos'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
        } );
    }

    async execute( { msg } ) {
        await this.sendDM(msg.author, {
            embed: {
                description: '**f!profil :** Affiche le profil\n**f!profil _@membre_ :** Affiche le profil de la personne mentionnée\n**f!infos :** Donne les commandes du bot',
                fields: [
                    {
                        name: 'Ajouter des éléments à votre profil',
                        value: '**f!add pseudo _pseudo_ :** Ajoute le pseudo en jeu au profil\n**f!add plateforme _plateforme_ :** Ajoute la plateforme sur laquelle vous jouez au profil\n**f!add skin _skin_ :** Ajoute le skin favori au profil\n**f!add lieudit _lieu-dit_ :** Ajoute le lieu-dit favori au profil\n**f!add niveau _niveau_ :** Ajoute le niveau en jeu au profil',
                        inline: false,
                    },
                    {
                        name: 'Modifier des éléments de votre profil',
                        value: '**f!edit pseudo _pseudo_ :** Modifie le pseudo en jeu du profil\n**f!edit plateforme _plateforme_ :** Modifie la plateforme sur laquelle vous jouez du profil\n**f!edit skin _skin_ :** Modifie le skin favori du profil\n**f!edit lieudit _lieu-dit_ :** Modifie le lieu-dit favori du profil\n**f!edit niveau _niveau_ :** Modifie le niveau en jeu du profil',
                        inline: false,
                    },
                    {
                        name: 'Supprimer des éléments de votre profil',
                        value: "**f!delete pseudo :** Supprime le pseudo en jeu du profil\n**f!delete plateforme :** Supprime la plateforme sur laquelle vous jouez du profil\n**f!delete skin :** Supprime le skin favori du profil\n**f!delete lieudit :** Supprime le lieu-dit favori du profil\n**f!delete niveau :** Supprime le niveau en jeu du profil\n**f!delete all :** Supprime l'ensemble des données du profil",
                        inline: false,
                    },
                ],
                thumbnail: {
                    url: this.bot.user.avatarURL,
                },
                author: {
                    name: 'Notre bot et ses commandes ',
                    icon_url: this.bot.guilds.get('486097909713207296').iconURL,
                },
                color: 16772907,
            },
        } ).catch( () => console.log('MISSING DM PERMS') );
        return new CommandResponse( { success: true } );
    }
}

export default Infos;
