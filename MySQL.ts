import {
    mysql_close,
    mysql_errno,
    mysql_error,
    mysql_fetch_field,
    mysql_fetch_row,
    mysql_free_result,
    mysql_get_client_info,
    mysql_init,
    mysql_num_fields,
    mysql_num_rows,
    mysql_query,
    mysql_real_connect,
    mysql_store_result,
    MysqlFieldObject,
    MySQLObject,
    MySQLResultObject,
    MysqlRowObject
} from "./mysqlFFI";
import {CString, FFIType, toArrayBuffer,} from "bun:ffi";
import {ptrToStruct} from "./ffi_helper";

function toRowObject(row: MysqlRowObject, fields: FieldInfo[]) {


}




type FieldInfo = {
    name: string,
}


export class MysqlResult {
    public readonly mysqlResult: MySQLResultObject;
    public readonly mysqlObject: MySQLObject;

    constructor(mysqlResult: MySQLResultObject, mysqlObject: MySQLObject) {
        this.mysqlResult = mysqlResult;
        this.mysqlObject = mysqlObject;
    }

    get fieldCount(): number {
        return mysql_num_fields(this.mysqlResult);
    }


    get rowCount(): number {
        return mysql_num_rows(this.mysqlResult);
    }

    fetchRow() {
        let row = mysql_fetch_row(this.mysqlResult);
        toRowObject(row, this.fields);
    }

    private _fields: FieldInfo[] = [];

    get fields(): FieldInfo[] {
        if (this._fields.length > 0) {
            return this._fields;
        }
        for (let i = 0; i < this.fieldCount; i++) {
            let fieldObj: MysqlFieldObject = mysql_fetch_field(this.mysqlResult);
            let obj = ptrToStruct(fieldObj, [
                {name: 'name', type: FFIType.cstring},
                {name: 'org_name', type: FFIType.cstring},
                {name: 'table', type: FFIType.cstring},
                {name: 'org_table', type: FFIType.cstring},
                {name: 'db', type: FFIType.cstring},
                {name: 'catalog', type: FFIType.cstring},
                {name: 'def', type: FFIType.cstring},
                {name: 'length', type: FFIType.u64},
                {name: 'max_length', type: FFIType.u64},
                {name: 'name_length', type: FFIType.u32},
                {name: 'org_name_length', type: FFIType.u32},
                {name: 'table_length', type: FFIType.u32},
                {name: 'org_table_length', type: FFIType.u32},
                {name: 'db_length', type: FFIType.u32},
                {name: 'catalog_length', type: FFIType.u32},
                {name: 'def_length', type: FFIType.u32},
                {name: 'flags', type: FFIType.u32},
                {name: 'decimals', type: FFIType.u32},
                {name: 'charsetnr', type: FFIType.u32},
                {name: 'type', type: FFIType.u32},
            ]) as FieldInfo;
            this._fields.push(obj);
        }

        return this._fields;
    }
}

export class MySQL {
    static readonly DEFAULT_UDS: string = '/var/run/mysqld/mysqld.sock';
    static readonly DEFAULT_PORT: number = 3306;
    public readonly mysqlObj: MySQLObject;


    private _hasResult: boolean = false;

    private _currentRes: MySQLResultObject = 0;

    isCurrentResult(res: MysqlResult) {
        return this._currentRes === res.mysqlResult;
    }

    private _freeResult() {
        if (this._currentRes !== 0)
            mysql_free_result(this._currentRes);
        this._currentRes = 0;
    }

    /**
     * Executes a query and dismissing any result
     * @param query
     */
    exec(query: string): void {
        this._freeResult();
        mysql_query(this.mysqlObj, query);
        this._freeResult();
    }


    query(query: string): MysqlResult | null {
        this._freeResult();
        mysql_query(this.mysqlObj, query);
        let resObj = mysql_store_result(this.mysqlObj);
        if (resObj !== 0) {
            this._currentRes = resObj;
            return new MysqlResult(resObj, this.mysqlObj);
        }
        return null;
    }


    /**
     * Is true if last action was error
     */
    get isError(): boolean {
        return this.errorCode !== 0;
    }

    /**
     * Get the error code from last action
     */
    get errorCode(): number {
        return mysql_errno(this.mysqlObj);
    }

    /**
     * Get the error string from last action
     */
    get errorText(): string {
        return mysql_error(this.mysqlObj);
    }

    /**
     * Closes connection to the server
     */
    close(): void {
        mysql_close(this.mysqlObj);
    }

    static getClientInfo(): string {
        return mysql_get_client_info();
    }

    constructor(host: string, username: string, password: string, database: string, port: number = MySQL.DEFAULT_PORT) {
        this.mysqlObj = mysql_init();
        let uds = MySQL.DEFAULT_UDS;
        if (host.startsWith('unix://')) {
            uds = host.substring(7);
            host = 'localhost';
        }

        //find port
        const regex = /:([\d]+)$/gm;
        let match = regex.exec(host);
        if (match) {
            port = parseInt(match[1], 10);
            host = host.substring(0, host.length - (port + '').length - 1);
        }
        console.error(host, port)

        mysql_real_connect(
            this.mysqlObj,
            host,
            username,
            password,
            database,
            port,
            uds,
            0
        );

        if (this.isError) {
            throw new Error(`${this.errorCode}: ${this.errorText}`);
        }
    }
}