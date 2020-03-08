import {DB_TYPE} from '../../config/env';
import {DB_TYPES} from '../../config/dbTypes';

let dbConfig = null;

/* use inline requires for conditional loading */
switch (DB_TYPE) {
    case DB_TYPES.FIREBASE:
        dbConfig = require('./firebase').default;
        break;
    default:
        throw new Error(`No database type '${DB_TYPE}' found`);
}

export const session = dbConfig.session;
export const controllers = dbConfig.controllers;

