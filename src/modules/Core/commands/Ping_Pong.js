import { Command, CommandOptions, CommandResponse } from 'axoncore';

class Pong extends Command {
    constructor(module) {
        super(module);

        this.label = 'pong';
        this.aliases = ['pong'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ping pong',
            description: 'Ping pong le bot.',
            usage: 'ping pong',
            examples: ['ping pong'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
            cooldown: 10000,
            guildOnly: false,
        } );
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'BADABOUM!');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);

        this.editMessage(mess, `BADABOUM! \`${diff}ms\``);
        return new CommandResponse( { success: true } );
    }
}

export default Pong;
