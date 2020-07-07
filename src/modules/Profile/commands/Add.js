import { Command, CommandOptions, CommandPermissions } from 'axoncore';

class Add extends Command {
    constructor(module) {
        super(module);

        this.label = 'add';
        this.aliases = ['add'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'add',
            description: 'Ajoute un element au profil.',
            usage: 'add <type> <element>',
            examples: [
                'add pseudo Sheldask',
                'add plateforme playstation',
                'add skin Exécuteur',
                'add lieudit Pleasant Park',
                'add niveau 5',
            ],
        };

        this.options = new CommandOptions(this, {
            argsMin: 2,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
            channels: {
                needed: ['603229947598733345'],
            },
        } );
    }

    async execute( { msg, args } ) {
        const user = msg.author;
        
        const type = this.module.types[args[0].toLowerCase()];
        
        if (!type) {
            return this.sendError(msg.channel, 'Cet élément ne fait pas parti du profil.');
        }

        const element = args.slice(1, args.length).join(' ');

        if (type === 'level' && (isNaN(element) || (!isNaN(element) && (+element > 1000 || +element >= 0) ) ) ) {
            return this.sendError(msg.channel, 'Le niveau doit etre un nombre compris entre 0 et 1000.');
        }
        // eslint-disable-next-line no-magic-numbers
        if (element.length > 25) {
            return this.sendError(msg.channel, 'Votre chaine de caractères est trop longue.');
        }

        try {
            await this.module.userDB.addKey(user.id, type, element);
        } catch (err) {
            this.logger.error(`ADD - ${type}: `, err);
            return this.sendError(msg.channel, `Erreur d'ajout de l'élément ${type}, contactez un administrateur.`);
        }

        return this.sendSuccess(msg.channel, `Votre ${args[0] === 'lieudit' ? 'lieu-dit' : args[0]} en jeu a été ajouté au profil avec succès !`);
    }
}

export default Add;
