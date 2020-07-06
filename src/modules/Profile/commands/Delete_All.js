import { Command, CommandOptions, CommandPermissions } from 'axoncore';

class All extends Command {
    constructor(module) {
        super(module);

        this.label = 'all';
        this.aliases = ['all'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'delete all',
            description: 'Supprime un element du profil.',
            usage: 'delete all',
            examples: ['delete all'],
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
    }

    async execute( { msg, args } ) {
        let user = msg.member;
        if (args.length > 1 && msg.member.roles.some(m => this.module.managerRoles.includes(m) ) ) {
            user = this.Resolver.member(msg.channel.guild, args);
            if (!user) {
                return this.sendError(msg.channel, 'Mentionnez un utilisateur valide!');
            }
        }

        try {
            await this.module.userDB.deleteAll(user.id);
        } catch (err) {
            this.logger.error(`DELETE - ALL: `, err);
            return this.sendError(msg.channel, `Erreur de suppression de tous les éléments , contactez un administrateur.`);
        }

        return this.sendSuccess(msg.channel, `Votre profile a été supprimé avec succès !`);
    }
}

export default All;
