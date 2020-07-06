import { Command, CommandOptions, CommandPermissions } from 'axoncore';

import All from './Delete_All';

class Delete extends Command {
    constructor(module) {
        super(module);

        this.label = 'delete';
        this.aliases = ['delete'];

        this.hasSubcmd = true;

        this.info = {
            owners: ['KhaaZ'],
            name: 'delete',
            description: 'Supprime un element du profil.',
            usage: 'delete <type>',
            examples: [
                'delete pseudo',
                'delete plateforme',
                'delete skin',
                'delete lieudit',
                'delete niveau',
            ],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
            channels: {
                needed: ['603229947598733345'],
            },
        } );
    }

    init() {
        return [All];
    }

    async execute( { msg, args } ) {
        let admin = false;
        let user = msg.member;
        if (args.length > 1 && msg.member.roles.some(m => this.module.managerRoles.includes(m) ) ) {
            user = this.Resolver.member(msg.channel.guild, args.slice(1, args.length) );
            if (!user) {
                return this.sendError(msg.channel, 'Mentionnez un utilisateur valide!');
            }
            admin = true;
        }
        
        const type = this.module.types[args[0].toLowerCase()];
        
        if (!type) {
            return this.sendError(msg.channel, 'Cet élément ne fait pas parti du profil.');
        }

        try {
            await this.module.userDB.deleteKey(user.id, type);
        } catch (err) {
            this.logger.error(`DELETE - ${type}: `, err);
            return this.sendError(msg.channel, `Erreur de suppression de l'élément ${type}, contactez un administrateur.`);
        }

        return admin
            ? this.sendSuccess(msg.channel, `Vous avez supprimé le ${args[0] === 'lieudit' ? 'lieu-dit' : args[0]} en jeu du profil de ${user.username} avec succès !`)
            : this.sendSuccess(msg.channel, `Votre ${args[0] === 'lieudit' ? 'lieu-dit' : args[0]} en jeu a été supprimé du profil avec succès !`);
    }
}

export default Delete;
