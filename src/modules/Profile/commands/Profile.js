import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

class Profile extends Command {
    constructor(module) {
        super(module);

        this.label = 'profil';
        this.aliases = ['profil', 'profile'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'profile',
            description: 'Affiche le profile d\'une personne.',
            usage: 'profile <user>',
            examples: ['profile', 'profile @Sheldask'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
            channels: {
                needed: ['603229947598733345'],
            },
        } );

        this.status = [
            { id: '487619001892077569', name: 'typique' },
            { id: '487619167197986826', name: 'atypique' },
            { id: '487619318205644802', name: 'rare' },
            { id: '487619565199818792', name: 'épique' },
            { id: '487619730304139264', name: 'légendaire' },
        ];
    }
    
    async execute( { msg, args } ) {
        const user = args.length === 0
            ? msg.member
            : this.Resolver.member(msg.channel.guild, args);
        if (!user) {
            return this.sendError(msg.channel, 'Mentionnez un utilisateur valide!');
        }
        const profile = await this.module.userDB.getOrFetch(user.id);
        
        let status;
        for (const element of this.status) {
            if (user.roles.includes(element.id) ) {
                status = element.name;
                break;
            }
        }
        
        this.sendMessage(msg.channel, {
            embed: {
                description: `** **\n**Statut du membre :** ${status}\n**Pseudo en jeu :** ${profile.pseudo || '???'}\n**Plateforme :** ${profile.plateforme || '???'}\n**Niveau en jeu :** ${profile.level || '???'}\n**Lieu-dit favori :** ${profile.location || '???'}\n**Skin favori :** ${profile.skin || '???'}\n** **`,
                thumbnail: {
                    url: user.avatarURL,
                },
                author: {
                    name: `Profil de ${user.username}`,
                    icon_url: msg.channel.guild.iconURL,
                },
                color: 16772907,
            },
        } );
        return new CommandResponse( { success: true } );
    }
}

export default Profile;
