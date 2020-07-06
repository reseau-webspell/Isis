import { Module, CommandPermissions } from 'axoncore';

import UserDB from '../../lib/UserDB';

import * as commands from './commands/index';

class Profile extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Profile';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Profile',
            description: 'Profile module - handle fortnitro profile',
        };

        this.permissions = new CommandPermissions(this, {}, true);

        this.userDB = new UserDB(this.axon.custom.DBLocation);

        this.managerRoles = ['486183415725555720', '603243315164348436'];

        this.types = {
            'pseudo': 'pseudo',
            'plateforme': 'plateforme',
            'skin': 'skin',
            'lieudit': 'location',
            'niveau': 'level',
            'lieu-dit': 'location',
        };
    }

    init() {
        return { commands };
    }
}

export default Profile;
