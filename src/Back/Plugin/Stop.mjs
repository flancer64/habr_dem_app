/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Dem_App_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Logger} */
    const $logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Link} */
    const $connLink = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Link$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Pwd} */
    const $connPwd = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Pwd$'];

    // COMPOSE RESULT
    async function init() {
        await $connLink.disconnect();
        await $connPwd.disconnect();
        $logger.info('All connections are closed.');
    }

    Object.defineProperty(init, 'name', {value: `${NS}.${init.name}`});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
