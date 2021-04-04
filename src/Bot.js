import Eris from 'eris';

import { AxonOptions } from 'axoncore';

import IsisClient from './IsisClient';

import botConfig from './configs/config.json';
import secret from './configs/secret.json';
import lang from './configs/lang.json';

import IsisUtils from './IsisUtils';

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: {
        DBLocation: `${__dirname}/../database/`,
    },
},
secret.webhooks,
{
    utils: IsisUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: null, // custom DB Service
    DBLocation: `${__dirname}/../database/`,

    axonConfig: null,
    guildConfig: null,
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Eris.Client(
    secret.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: true,
        messageLimit: 100,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
        intents: ['guilds', 'guildMessages'],
    },
);

const Bot = new IsisClient(
    client,
    axonOptions,
);

export default Bot;
