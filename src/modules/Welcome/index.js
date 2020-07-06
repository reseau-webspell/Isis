import { Module } from 'axoncore';

import * as listeners from './listeners/index';

class Welcome extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Welcome';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'welcome',
            description: 'Welcome user when joining the server.',
        };
    }

    init() {
        return { listeners };
    }
}

export default Welcome;
