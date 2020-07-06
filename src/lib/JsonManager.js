import userDefault from './UserDefault.json';

import { AsyncQueue } from 'axoncore';

import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/**
 * @typedef {{
 * id: String; ds: String; acpc: String; switch: String, updatedAt: String, createdAt: String
 * }} UserJSON
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 */

/**
 * Manager class for handling Json database
 *
 * @author KhaaZ
 *
 * @class JsonManager
 */
class JsonManager {
    /**
     * Creates an instance of JsonManager.
     *
     * @param {String} basePath - The path / location where to create and use the database
     *
     * @memberof JsonManager
     */
    constructor(basePath) {
        /**
         * @type {UserJSON}
         */
        this._userDefault = userDefault;

        basePath = `${basePath}Users/`;
        if (!fs.existsSync(basePath) ) {
            console.log('The DB directory doesn\'t exist. Creating...');
            fs.mkdirSync(basePath, { recursive: true } );
            console.log('DB directory created');
        }

        this._basePath = basePath || `${__dirname}/Database/`;

        /**
         * @type {Object.<string, AsyncQueue>}
         */
        this.userExecutors = {};
    }

    /**
     * Get User executor
     * @param {String} userID User ID
     * @returns {AsyncQueue}
     * @memberof JsonManager
     */
    getExecutor(userID) {
        let executor = this.userExecutors[userID];
        if (!executor) {
            executor = new AsyncQueue();
            this.userExecutors[userID] = executor;
        }
        
        return executor;
    }

    // **** CORE **** //

    /**
     * Parse JSON string as object/array
     * @param {String} string JSON string
     * @returns {Object.<string, any>|Array<any>|String} Parsed array/object or input string if failed
     * @memberof JsonManager
     */
    toJSON(string) {
        if (!string) {
            return null;
        }
        try {
            return JSON.parse(string);
        } catch (e) {
            return string;
        }
    }

    /**
     * Parse object/array as JSON string
     * @param {Object|Array} json Object/array to be parsed into JSON string
     * @returns {String|Object.<string, any>|Array<any>} JSON string or parsed array/object if failed
     * @memberof JsonManager
     */
    toString(json) {
        if (!json) {
            return null;
        }
        try {
            return JSON.stringify(json, null, '\t');
        } catch (e) {
            return json;
        }
    }

    /**
     * Get user config path
     * @param {String} uID User ID
     */
    _buildPath(uID) {
        return `${this._basePath}${uID}.json`;
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     *
     * @memberof JsonManager
     */
    async readFile(path) {
        if (!path) {
            return null;
        }
        try {
            return await readFileAsync(path);
        } catch (err) {
            return null;
        }
    }

    /**
     * Write a file
     *
     * @param {String} path
     * @param {String} [content='{}']
     * @returns {Promise<Boolean>} Whether or not the task completed successfully
     *
     * @memberof JsonManager
     */
    async writeFile(path, content = '{}') {
        if (!path) {
            return null;
        }
        if (path.search('.json') === -1) {
            return null;
        }

        try {
            await writeFileAsync(path, content, 'utf8');
            return true;
        } catch (err) {
            return false;
        }
    }

    // **** INIT **** //

    /**
     * Create a file and schema for a User
     * @param {String} uID The user id
     * @returns {Promise<UserJSON>} The newly created Schema || null
     * @memberof JsonManager
     */
    async createUser(uID) {
        const userSchema = Object.assign( {}, this._userDefault);
        userSchema.id = uID;
        userSchema.createdAt = new Date();

        return this.writeUser(uID, userSchema);
    }

    // **** FETCHERS **** //

    /**
     * Fetch the User schema for the given user
     *
     * @param {String} uID User ID
     * @returns {Promise<UserJSON>} GuildSchema || null
     * @memberof JsonManager
     */
    async fetchUser(uID) {
        const res = await this.readFile(this._buildPath(uID) );
        if (res) {
            const r = this.toJSON(res);
            return r;
        }
        return res;
    }

    // **** UPDATERS **** //

    /**
     * Update the schema with the given value for the given guild
     *
     * @param {String} gID Guild ID
     * @param {String} key Value to update
     * @param {updateDBVal} value - The value to update for the given key (can be anything)
     * @returns {Promise<UserJSON>} UserSchema || null
     * @memberof JsonManager
     */
    updateUserKey(uID, key, value) {
        return this.getExecutor(uID).add(async() => {
            const userSchema = await this.fetchUser(uID);
            userSchema[key] = value;
            
            return this.writeUser(uID, userSchema);
        }, true);
    }

    // **** OVERWRITER **** //

    /**
     * Write the updated schema in the file (for the given user).
     *
     * @param {String} uID User ID
     * @param {UserJSON} schema GuildSchema
     * @returns {Promise<UserJSON>} GuildSchema || null
     *
     * @memberof JsonManager
     */
    async writeUser(uID, schema) {
        schema.updatedAt = new Date();

        const res = await this.writeFile(this._buildPath(uID), this.toString(schema) );
        if (res) {
            return schema;
        }
        return null;
    }
}

export default JsonManager;
