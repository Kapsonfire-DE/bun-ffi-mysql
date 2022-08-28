import {CString, dlopen, FFIFunction, FFIType, suffix} from "bun:ffi";
import _mysqlSymboles from "./lib/mysql";
import mysql from "./lib/mysql";
import {MysqlResult} from "./MySQL";

const path = `./lib/libmysqlclient-${process.arch}.${suffix}`;
const NULL = 0;

/**
 * Only import these functions
 */
let mysqlSymboles: { [key: string]: FFIFunction } = {
    mysql_real_connect: {},
    mysql_error: {},
    mysql_init: {},
    mysql_errno: {},
    mysql_query: {},
    mysql_close: {},
    mysql_get_client_info: {},
    mysql_free_result: {},
    mysql_store_result: {},
    mysql_num_rows: {},
    mysql_num_fields: {},
    mysql_fetch_row: {},
    mysql_fetch_field: {},

};
Object.keys(mysqlSymboles).forEach(funcName => mysqlSymboles[funcName] = _mysqlSymboles[funcName]);
mysqlSymboles.mysql_init.args[0] = FFIType.u64;
const lib = dlopen(path, mysqlSymboles);



function cString(text): Uint8Array {
    return new TextEncoder().encode(`${text}\0`);
}



export type MySQLObject = Number;
export type MySQLResultObject = Number;
export type MysqlRowObject = Number;
export type MysqlFieldObject = Number;












const mysql_real_connect = function (mysqlObj: MySQLObject, host: string, user: string, password: string, database: string, port: number, uds: null | string, clientflags: number): void {
    lib.symbols.mysql_real_connect(
        mysqlObj,
        cString(host),
        cString(user),
        cString(password),
        cString(database),
        port,
        uds === null ? NULL : cString(uds),
        clientflags
    );
}


const mysql_get_client_info = function() : string {
    return (lib.symbols.mysql_get_client_info() as CString).toString();
}

const mysql_init = function (mysqlObj: null|MySQLObject = NULL): MySQLObject {
    return (lib.symbols.mysql_init(mysqlObj??NULL));
}

const mysql_errno = function (mysqlObj: MySQLObject): number {
    return (lib.symbols.mysql_errno(mysqlObj));
}
const mysql_error = function (mysqlObj: MySQLObject) : string {
    return (lib.symbols.mysql_error(mysqlObj) as CString).toString();
}

const mysql_close = function(mysqlObj: MySQLObject) : void {
    lib.symbols.mysql_close(mysqlObj);
}

const mysql_query = function(mysqlObj: MySQLObject, query: string) : number {
    return lib.symbols.mysql_query(mysqlObj, cString(query))
}

const mysql_free_result = function(mysqlRes: MySQLResultObject) : void {
    lib.symbols.mysql_free_result(mysqlRes);
}

const mysql_store_result = function(mysqlObj: MySQLObject) : MySQLResultObject {
    return lib.symbols.mysql_store_result(mysqlObj);
}

const mysql_num_rows = function(mysqlRes: MySQLResultObject) : number {
    return lib.symbols.mysql_num_rows(mysqlRes);
}

const mysql_num_fields = function(mysqlRes: MySQLResultObject) : number {
    return lib.symbols.mysql_num_fields(mysqlRes);
}

const mysql_fetch_row = function(mysqlRes: MySQLResultObject) : MysqlRowObject {
    return lib.symbols.mysql_fetch_row(mysqlRes);
}

const mysql_fetch_field = function(mysqlRes: MySQLResultObject) : MysqlFieldObject {
    return lib.symbols.mysql_fetch_field(mysqlRes);
}

export {
    mysql_error, mysql_errno, mysql_real_connect, mysql_init, mysql_close, mysql_get_client_info, mysql_query, mysql_free_result, mysql_store_result, mysql_num_rows, mysql_fetch_row, mysql_num_fields, mysql_fetch_field
}
