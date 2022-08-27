import {CString, dlopen, FFIType,} from "bun:ffi";
import _mysqlSymboles from "./lib/mysql";

const path = './lib/libmysqlclient.so.21.2.30';
const NULL = 0;

const onlyImportFunctions = [
    "mysql_real_connect",
    "mysql_error",
    "mysql_init"
];
let mysqlSymboles = {};
onlyImportFunctions.forEach(funcName => mysqlSymboles[funcName] = _mysqlSymboles[funcName]);

const lib = dlopen(path, mysqlSymboles);

let mysqlObj = lib.symbols.mysql_init(NULL);

console.log(mysqlObj);

function cString( text ) : Uint8Array{
    return new TextEncoder().encode( `${text}\0` );
}
const mysql_real_connect = function(mysqlObj: any, host: string, user: string, password: string, database: string, port: number, uds: null|string, clientflags: number) : void {
    lib.symbols.mysql_real_connect(
        mysqlObj,
        cString(host),
        cString(user),
        cString(password),
        cString(database),
        3306,
        cString(uds??''),
        0
    );
}
const mysql_error = function(mysqlObj: any) {
    return (lib.symbols.mysql_error(mysqlObj) as CString).toString();
}
mysql_real_connect(mysqlObj, "localhost", "ffitest", "ffistest", "ffitest", 3306, "/var/run/mysqld/mysqld.sock", 0);


console.log(mysql_error(mysqlObj));