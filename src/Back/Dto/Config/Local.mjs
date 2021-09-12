/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Fl64_Dem_App_Back_Dto_Config_Local';

// MODULE'S CLASSES
export default class Fl64_Dem_App_Back_Dto_Config_Local {
    /** @type {TeqFw_Db_Back_Api_Dto_Config_Local} */
    dbLink;
    /** @type {TeqFw_Db_Back_Api_Dto_Config_Local} */
    dbPwd;
}

/**
 * Factory to create new DTO instances.
 * @memberOf Fl64_Dem_App_Back_Dto_Config_Local
 */
export class Factory {
    constructor(spec) {
        /** @type {typeof TeqFw_Db_Back_Api_Dto_Config_Local} */
        const DDb = spec['TeqFw_Db_Back_Api_Dto_Config_Local#'];
        /** @type {TeqFw_Db_Back_Api_Dto_Config_Local.Factory} */
        const fDb = spec['TeqFw_Db_Back_Api_Dto_Config_Local#Factory$'];

        /**
         * @param {Fl64_Dem_App_Back_Dto_Config_Local|null} data
         * @return {Fl64_Dem_App_Back_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const res = new Fl64_Dem_App_Back_Dto_Config_Local();
            res.dbLink = (data?.dbLink instanceof DDb)
                ? data.dbLink : fDb.create(data?.dbLink);
            res.dbPwd = (data?.dbPwd instanceof DDb)
                ? data.dbPwd : fDb.create(data?.dbPwd);
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
