/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Dem_App_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl64_Dem_App_Back_Defaults} */
    const $DEF = spec['Fl64_Dem_App_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const $logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_Config} */
    const $config = spec['TeqFw_Core_Back_Config$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Link} */
    const $connLink = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Link$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Pwd} */
    const $connPwd = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Pwd$'];

    // COMPOSE RESULT
    async function init() {
        /** @type {Fl64_Dem_App_Back_Dto_Config_Local} */
        const cfg = $config.getLocal($DEF.DESC_NODE);
        await $connLink.init(cfg.dbLink)
        await $connPwd.init(cfg.dbPwd)
        $logger.info('All connections are opened.');
    }

    Object.defineProperty(init, 'name', {value: `${NS}.${init.name}`});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
