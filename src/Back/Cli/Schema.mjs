/**
 * Create schemas for MariaDB & MySQL DBs.
 *
 * @namespace Fl64_Dem_App_Back_Cli_Schema
 */
// DEFINE WORKING VARS
const NS = 'Fl64_Dem_App_Back_Cli_Schema';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl64_Dem_App_Back_Cli_Schema
 */
function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {Fl64_Dem_App_Back_Defaults} */
    const _DEF = spec['Fl64_Dem_App_Back_Defaults$'];
    /** @type {Fl64_Dem_User_Link_Back_Api_Defaults} */
    const _DEF_LINK = spec['Fl64_Dem_User_Link_Back_Api_Defaults$'];
    /** @type {Fl64_Dem_User_Pwd_Back_Api_Defaults} */
    const _DEF_PWD = spec['Fl64_Dem_User_Pwd_Back_Api_Defaults$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const _fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const _logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Core_Back_App} */
    const _app = spec['TeqFw_Core_Back_App$'];
    /** @type {TeqFw_Core_Back_Config} */
    const _config = spec['TeqFw_Core_Back_Config$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Link} */
    const _connLink = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Link$'];
    /** @type {Fl64_Dem_App_Back_Redo_Db_Conn_Pwd} */
    const _connPwd = spec['Fl64_Dem_App_Back_Redo_Db_Conn_Pwd$'];
    /** @type {TeqFw_Db_Back_Api_Act_Dem_Load_Schema} */
    const _aDemLoadSchema = spec['TeqFw_Db_Back_Api_Act_Dem_Load_Schema$'];
    /** @type {TeqFw_Db_Back_Api_Act_Dem_Load_Map} */
    const _aDemLoadMap = spec['TeqFw_Db_Back_Api_Act_Dem_Load_Map$'];
    /** @type {TeqFw_Db_Back_Api_Act_Dem_Norm} */
    const _aNorm = spec['TeqFw_Db_Back_Api_Act_Dem_Norm$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ISchema} */
    const _schema = spec['TeqFw_Db_Back_Api_RDb_ISchema$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Fl64_Dem_App_Back_Cli_Schema
     */
    const action = async function () {
        // _logger.reset();
        _logger.pause(false);
        _logger.info('Start logging...');
        const path = _config.getBoot().projectRoot;
        const dems = await _aDemLoadSchema.exec({path});
        // create schema for LINK db
        const linkParts = {
            [_DEF.NAME]: dems[_DEF.NAME],
            [_DEF_LINK.NAME]: dems[_DEF_LINK.NAME]
        };
        const linkMap = await _aDemLoadMap.exec({path, filename: null});
        const linkDem = await _aNorm.exec({dems: linkParts, map: linkMap});
        _schema.setDem({dem: linkDem});
        await _schema.dropAllTables({conn: _connLink});
        await _schema.createAllTables({conn: _connLink});
        // create schema for PWD db
        const pwdParts = {
            [_DEF.NAME]: dems[_DEF.NAME],
            [_DEF_PWD.NAME]: dems[_DEF_PWD.NAME]
        };
        const pwdMap = await _aDemLoadMap.exec({path, filename: 'etc/teqfw.schema.map.pwd.json'});
        const pwdDem = await _aNorm.exec({dems: pwdParts, map: pwdMap});
        _schema.setDem({dem: pwdDem});
        await _schema.dropAllTables({conn: _connPwd});
        await _schema.createAllTables({conn: _connPwd});
        //
        _logger.info('Done.');
        await _app.stop();
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = _fCommand.create();
    res.realm = _DEF.CLI_PREFIX;
    res.name = 'schema';
    res.desc = 'Create schemas for MariaDB & MySQL DBs.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
