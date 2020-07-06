import JsonManager from './JsonManager';

import { Store } from 'axoncore';

class UserDB extends Store {
    constructor(dbLocation) {
        super(new Map() );
        this.manager = new JsonManager(dbLocation);
    }

    async getOrFetch(userID) {
        let user = this.get(userID);
        if (!user) {
            user = await this.fetchOrCreate(userID);
            this.set(userID, user);
        }

        return user;
    }

    fetch(userID) {
        return this.manager.fetchUser(userID);
    }

    create(userID) {
        return this.manager.createUser(userID);
    }

    async fetchOrCreate(userID) {
        let user = await this.fetch(userID);
        if (!user) {
            user = await this.create(userID);
        }
        return user;
    }

    async addKey(userID, key, element) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, key, element);
        this.set(userID, user);
        return user;
    }

    async deleteKey(userID, key) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, key, '???');
        this.set(userID, user);
        return user;
    }

    async deleteAll(userID) {
        const user = await this.getOrFetch(userID);

        user.pseudo = '???';
        user.plateforme = '???';
        user.skin = '???';
        user.location = '???';
        user.level = '???';

        this.set(userID, user);
        return this.manager.writeUser(userID, user);
    }
}

export default UserDB;
