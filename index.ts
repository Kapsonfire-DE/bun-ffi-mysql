import {CString, dlopen, FFIType,} from "bun:ffi";
import _mysqlSymboles from "./lib/mysql";

const path = './lib/libmysqlclient.so.21.2.30';
const NULL = 0;

const onlyImportFunctions = [
    "mysql_real_connect",
    "mysql_error",
    "mysql_init",
    "mysql_errno"
];
let mysqlSymboles = {};
onlyImportFunctions.forEach(funcName => mysqlSymboles[funcName] = _mysqlSymboles[funcName]);
mysqlSymboles.mysql_init.args[0] = FFIType.u64;
const lib = dlopen(path, mysqlSymboles);

let mysqlObj = lib.symbols.mysql_init(NULL);

console.log(mysqlObj);

function cString( text ) : Uint8Array{
    return new TextEncoder().encode( `${text}\0` );
}
cString.null = new TextEncoder().encode( `\0` );
const mysql_real_connect = function(mysqlObj: any, host: string, user: string, password: string, database: string, port: number, uds: null|string, clientflags: number) : void {
    lib.symbols.mysql_real_connect(
        mysqlObj,
        cString(host),
        cString(user),
        cString(password),
        cString(database),
        3306,
        uds === null ? cString.null : cString(uds),
        clientflags
    );
}
const mysql_errno = function(mysqlObj: any) : number{
    return (lib.symbols.mysql_errno(mysqlObj));
}
const mysql_error = function(mysqlObj: any) {
    return (lib.symbols.mysql_error(mysqlObj) as CString).toString();
}
mysql_real_connect(mysqlObj, "localhost", "ffitest", "ffistest", "ffitest", 3306, "/var/run/mysqld/mysqld.sock", 0);


console.log(mysql_errno(mysqlObj), mysql_error(mysqlObj));