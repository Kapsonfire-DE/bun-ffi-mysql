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
    MySQLResultObject
} from "./mysqlFFI";
import {FFIType,} from "bun:ffi";
import {ptrToStruct} from "./ffi_helper";
import {MySQLTypes, MysqlTypesDates, MysqlTypesNumeric} from "./MySQLTypes";


type FieldInfo = {
    name: string,
    type: MySQLTypes
}


export class MysqlResult {
    get typeSafety(): boolean {
        return this._typeSafety;
    }

    set typeSafety(value: boolean) {
        this._typeSafety = value;
    }
    private _typeSafety: boolean = true;
    public readonly mysqlResult: MySQLResultObject;
    public readonly mysql: MySQL;

    constructor(mysqlResult: MySQLResultObject, mysql: MySQL) {
        this.mysqlResult = mysqlResult;
        this.mysql = mysql;
        this._typeSafety = mysql.typeSafety;
    }

    get fieldCount(): number {
        return mysql_num_fields(this.mysqlResult);
    }


    get rowCount(): number {
        return mysql_num_rows(this.mysqlResult);
    }

    fetchRow() : null|object {
        let row = mysql_fetch_row(this.mysqlResult);
        if(row === null) {
            return null;
        }
        let rowObj = ptrToStruct(row, this.fields.map(f => {
            return {
                name: f.name,
                type: FFIType.cstring
            }
        }));

        if(this._typeSafety) {
            this.fields.map(field => {
                if (MysqlTypesNumeric.includes(field.type)) {
                    rowObj[field.name] = Number(rowObj[field.name])
                } else if (MysqlTypesDates.includes(field.type) ) {
                    rowObj[field.name] = new Date(rowObj[field.name]);
                } else {
                    //console.log('unhandled type: ' + field.type);
                }
            });
        }

        return rowObj;
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

    fetchAllRows() : object[] {
        let data = new Array(this.rowCount)
        for(let i = 0; i < data.length; i++) {
            let rowdata = this.fetchRow();
            if(rowdata === null) break;
            data[i] = rowdata;
        }
        return data;
    }
}

export class MySQL {
    get typeSafety(): boolean {
        return this._typeSafety;
    }

    set typeSafety(value: boolean) {
        this._typeSafety = value;
    }
    static readonly DEFAULT_UDS: string = '/var/run/mysqld/mysqld.sock';
    static readonly DEFAULT_PORT: number = 3306;
    public readonly mysqlObj: MySQLObject;

    private _typeSafety: boolean = true;

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

        if (resObj !== 0 && this.errorCode === 0) {
            this._currentRes = resObj;
            return new MysqlResult(resObj, this);
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